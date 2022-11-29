const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;

// req.body={
//         user={información del usuario}
//}
export default async function tokens(req, res) {
  const { method, body } = req;
  const id = req.body.user;

  switch (method) {
    case "POST":
      {
        //Ruta que devuelve el total de tokens a ser transferidos

        // Pimero verifico la cantidad de invitados que se registraron, y lógica de qué milestones de cantidad se cobraron
        const registeredReferred = (
          await Award.findAll({ where: { referringId: id } })
        ).length; //Total de usuarios que se registraron con mi código
        let milestoneId = 0;
        let objetivo = 0;
        //Control de milestones de 10 invitados
        milestoneId = 3;
        objetivo = 10;
        const milestone10Transferred = (
          await Award.findAll({
            where: { milestoneId: milestoneId, winnerId: id },
          })
        ).length;
        if (
          milestone10Transferred < Math.floor(registeredReferred / objetivo)
        ) {
          const milestone10 = await Milestone.findByPk(milestoneId);
          const faltante =
            Math.floor(registeredReferred / objetivo) - milestone10Transferred;
          for (let i = 0; i < faltante; i++) {
            await Award.create({
              tokenAmount: milestone10.tokenAmount,
              winnerId: id,
              milestoneId: milestone10.id,
            });
          }
        }
        //Control de milestones de 50 invitados
        milestoneId = 4;
        objetivo = 50;
        const milestone50Transferred = (
          await Award.findAll({
            where: { milestoneId: milestoneId, winnerId: id },
          })
        ).length;
        if (
          milestone50Transferred < Math.floor(registeredReferred / objetivo)
        ) {
          const milestone50 = await Milestone.findByPk(milestoneId);
          const faltante =
            Math.floor(registeredReferred / objetivo) - milestone50Transferred;
          for (let i = 0; i < faltante; i++) {
            await Award.create({
              tokenAmount: milestone50.tokenAmount,
              winnerId: id,
              milestoneId: milestone50.id,
            });
          }
        }
        //Control de milestones de 100 invitados
        milestoneId = 5;
        objetivo = 100;
        const milestone100Transferred = (
          await Award.findAll({
            where: { milestoneId: milestoneId, winnerId: id },
          })
        ).length;
        if (
          milestone100Transferred < Math.floor(registeredReferred / objetivo)
        ) {
          const milestone100 = await Milestone.findByPk(milestoneId);
          const faltante =
            Math.floor(registeredReferred / objetivo) - milestone100Transferred;
          for (let i = 0; i < faltante; i++) {
            await Award.create({
              tokenAmount: milestone100.tokenAmount,
              winnerId: id,
              milestoneId: milestone100.id,
            });
          }
        }

        const pendingTokens = await Award.findAll({
          where: { transferred: false, winnerId: id },
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
        //Ruta que realiza la trasnferencia de tokens pendientes desde la cta de itesa a la cuenta del usuario
        //Req.body:{
        //  user.id
        //  totalDeTokens
        //  address
        // }

        //Primero, ejecuto transferencia de tokens
        //A completar por Tincho & Elbolax

        //Actualizo DB
        await Award.update({ transferred: true }, { where: { winnerId: id } });
        res.status(202).send();
      }
      break;
    default:
      break;
  }
}
