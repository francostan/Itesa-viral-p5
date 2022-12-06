const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;
const { Sequelize, Op } = require("sequelize");
//const Cookies = require("cookies");
const speakeasy = require("speakeasy");
import { sign } from "../../auth/token/tokens";

export default async function newuser(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      {
        const foundUser = await User.findByPk(body.id);
        //Validación del usuario
        var validate = await speakeasy.totp.verify({
          secret: foundUser.secret,
          encoding: "base32",
          token: body.token,
          window: 5,
        });

        //Generación de Cookie y guardado en browser
        if (validate) {
          const { nick_name, email, id, viral_code, admin } = foundUser;
          const payload = { nick_name, email, id, viral_code, admin };
          const token = await sign(payload);
          res.setHeader(
            "set-cookie",
            `getViral=${token}; path=/; samesite=lax; httponly`
          );

          //Seteo en la DB los controles de expiración de Awards y de Milestone (Awards pasan a currentCampaign:False y Milestone pasa a expired:true)
          
          //////////////////////////////////////////////////////////////////////////////// tambien se usa en updateAwards
          if (admin) {
            const today = new Date();
            let expDate = await Milestone.findOne({
              where: { expired: false, id: { [Op.notIn]: [1, 2] } },
            });
            if(expDate)  expDate = new Date(expDate.expirationDate) 
            else expDate = new Date();
            if (today > expDate) {
              await Milestone.update(
                { expired: true },
                { where: { expired: false } }
              );
              await Award.update(
                { currentCampaign: false },
                { where: { currentCampaign: true } }
              );
            }
          }
          ////////////////////////////////////////////////////////////////////////////////


          //actualizo los awards en la DB antes de cargar el usuario en HomeUser

          //Total de usuarios que se registraron con el viral_code el usuario
          let registeredReferred = (
            await Award.findAll({ where: { referringId: id,currentCampaign:true } })
          );
          let currentCampaignId
          if(registeredReferred.length>0){currentCampaignId=registeredReferred[0].dataValues.campaignId}
          else{currentCampaignId=0}
          
  
          registeredReferred=registeredReferred.length

          //Array con todos los objetos award en los que el usuario es el winnerId
          let awardsAchieved = await Award.findAll(
            { attributes: ["milestoneId"] },
            { where: { winnerId: id } }
          );
          // Convierto el array en un array de milestoneId
          awardsAchieved = awardsAchieved.map(
            (elemento) => elemento.dataValues.milestoneId
          );
          // Array de {id,tokenAmount,tokenQuantity,expirationDate} de todos los milestone a cumplir por cantidad de referidos
          let currentAvailableMilestones = await Milestone.findAll({
            attributes: [
              "id",
              "tokenAmount",
              "quantityCondition",
              "expirationDate",
            ],
            where: { id: { [Op.notIn]: [1, 2] }, expired: false }, //Excluyo los milestone de registro y de invitación
          });
          currentAvailableMilestones = currentAvailableMilestones.map(
            (element) => element.dataValues
          );

          //Mapeo el array currentAvailableMilestones para chequear cada Milestone disponible y creo los Award que correspondan
          if (currentAvailableMilestones.length > 0 && registeredReferred > 0) {
            const currentPromises = currentAvailableMilestones.map(
              (elemento) => {
                if (
                  registeredReferred >= elemento.quantityCondition &&
                  !awardsAchieved.includes(elemento.id)
                ) {
                  Award.create({
                    tokenAmount: elemento.tokenAmount,
                    winnerId: id,
                    milestoneId: elemento.id,
                    campaignId:currentCampaignId
                  });
                }
              }
            );
          }

          res.status(200).send({
            nick_name: foundUser.nick_name,
            id: foundUser.id,
            email: foundUser.email,
            viral_code: foundUser.viral_code,
            admin: foundUser.admin,
          });
        } else {
          console.log("NO VALIDADO");
          res.status(403).json("Código 2FA incorrecto");
        }
      }

      break;
    case "GET":
      {
        res.json("Llegaste a GET");
      }
      break;
    default:
      res.send("Otro método");
      break;
  }
}
