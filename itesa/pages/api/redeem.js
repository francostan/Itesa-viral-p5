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
    case "POST":{

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
        await Award.update({ transferred: true }, { where: { winnerId: userId } });
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
    default:
      break;
  }
}
