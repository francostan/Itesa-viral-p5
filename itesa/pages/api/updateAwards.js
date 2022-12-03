const db = require("../../db/models/index");
const Award = db.Award;
const Milestone = db.Milestone;
const { Sequelize, Op } = require("sequelize");

// req.body={
//         user={información del usuario}
//}
export default async function tokens(req, res) {
  const { method, body } = req;
  const userId = req.body.user;

  switch (method) {
    case "POST":
      //Ruta que devuelve el total de tokens a ser transferidos
      {
        //Total de usuarios que se registraron con el viral_code el usuario
        const registeredReferred = (
          await Award.findAll({ where: { referringId: userId } })
        ).length;
        //Array con todos los objetos award en los que el usuario es el winnerId
        let awardsAchieved = await Award.findAll(
          { attributes: ["milestoneId"] },
          { where: { winnerId: userId } }
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

        //Mapeo el array currentAvailableMilestones para chequear cada Milestone disponible
        if (currentAvailableMilestones.length > 0) {
          const currentPromises = currentAvailableMilestones.map((elemento) => {
            if (
              registeredReferred >= elemento.quantityCondition &&
              !awardsAchieved.includes(elemento.id)
            ) {
              Award.create({
                tokenAmount: elemento.tokenAmount,
                winnerId: userId,
                milestoneId: elemento.id,
              });
            }
          });
        }

        // Calcula y envía al FRONT el total de tokens
        const pendingTokens = await Award.findAll({
          where: { transferred: false, winnerId: userId },
        });
        let total = pendingTokens.reduce(
          (acum, elemento) => acum + elemento.tokenAmount,
          0
        );
        res.status(200).send(total);
      }
      break;
    case "PUT":
      {
        //Ruta que setea como transferred True a los Awards luego de que se ejecuten las transacciones de token
        //Req.body:{
        //  user.id
        //  totalDeTokens
        //  address
        // }
        //Actualizo DB
        await Award.update({ transferred: true }, { where: { winnerId: id } });
        res.status(202).send();
      }
      break;
    default:
      break;
  }
}
