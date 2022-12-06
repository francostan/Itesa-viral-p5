const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;
const { Sequelize, Op } = require("sequelize");

export default async function newuser(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      {
        //Reseteo la cantidad de referidos si pasó la fecha de expiración de la campaña
        const today = new Date();
        let expDate = await Milestone.findOne({
          where: { expired: false, id: { [Op.notIn]: [1, 2] } },
        });
        expDate = new Date(expDate.expirationDate);
        if (today > expDate) {
            await Milestone.update({expired:true},{where:{expired:false}})
            await Award.update({currentCampaign:false},{where:{currentCampaign:true}})
        }

      }
      res.status(200).send("Campos expirados seteados")
      break;

    default:
      res.send("Otro método");
      break;
  }
}
