import { current } from "@reduxjs/toolkit";

const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;
const { Sequelize, Op } = require("sequelize");
const speakeasy = require("speakeasy");

export default async function newuser(req, res) {
  const { method, body } = req;
  const id = req.body.id;
  // const { nick_name, email, password } = body;

  switch (method) {
    case "POST":
      {
        // Creación de usuario
        const created = await User.create({
          nick_name: body.nick_name,
          email: body.email,
          password: body.password,
          admin: body.admin,
        });
        // Recuperamos ID de campaña vigente (si la hay)
        let currentCampaign=await Milestone.findOne({attributes:["campaignId"],where:{expired:false,campaignId:{[Op.not]:0}}}) //Campaña vigente, o si no hay, es 0
        //estas lineas duplicadas son para que el script de generación de users no falle. cuando el script corre aunque esté el await a veces la linea 26 devuelve nulo aunque haya una campaña vigente
        //ingresando el usuario normalmente este error no sucede
        currentCampaign=await Milestone.findOne({attributes:["campaignId"],where:{expired:false,campaignId:{[Op.not]:0}}}) //Campaña vigente, o si no hay, es 0
        currentCampaign=await Milestone.findOne({attributes:["campaignId"],where:{expired:false,campaignId:{[Op.not]:0}}}) //Campaña vigente, o si no hay, es 0
        if (!currentCampaign) currentCampaign={campaignId:0}

        // Creación de award por registro
        const registerMilestone = await Milestone.findByPk(1);
        const registerAward = await Award.create({
          tokenAmount: registerMilestone.tokenAmount,
          winnerId: created.id,
          milestoneId: registerMilestone.id,
          campaignId:currentCampaign.campaignId
        });

        //Para el caso en que el registro es con código de referido
        if (body.referring) {
          const referringUser = await User.findOne({
            where: { viral_code: body.referring },
          });
          Award.update(
            { referringId: referringUser.id },
            { where: { id: registerAward.id } }
          );
          const invitationMilestone = await Milestone.findByPk(2);
          const invitationAward = await Award.create({
            tokenAmount: invitationMilestone.tokenAmount,
            winnerId: referringUser.id,
            milestoneId: invitationMilestone.id,
            campaignId:currentCampaign.campaignId
          });
        }

        res.json("Usuario creado con éxito");
      }
      break;
    case "GET":
      {
        const users = await User.findAll();

        res.send(users);
      }
      break;

    case "PUT":
      {
        const user = await User.findByPk(id);

        user.address = body.address;

        user.save();

        res.send("Se ha actualizado el address");
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}