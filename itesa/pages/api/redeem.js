const db = require("../../db/models/index");
const Award = db.Award;
import addXXInvitesAward from "../../utils/addXXInvitesAward";

// req.body={
//         user={información del usuario}
//}
export default async function tokens(req, res) {
  const { method, body } = req;
  const id = req.body.user;

  switch (method) {
    case "POST":
      //Ruta que devuelve el total de tokens a ser transferidos
      {
        //Agregar milestone único de 10 invitados
        await addXXInvitesAward(id,3,10)

        //Agregar milestone único de 50 invitados
        await addXXInvitesAward(id,4,50)

        //Agregar milestone único de 100 invitados
        await addXXInvitesAward(id,5,100)

        //

        // Calcula y envía al FRONT el total de tokens
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









// Lógica para milestone que se pueden cumplir varias veces (Ej, el de 10 invitados, se cumple a los 10, a los 20, a los 30, etc.)
        // let milestoneId = 0;
        // let objetivo = 0;
        //Control de milestones de 10 invitados
        // milestoneId = 3;
        // objetivo = 10;
        // const milestone10Transferred = (
        //   await Award.findAll({
        //     where: { milestoneId: milestoneId, winnerId: id },
        //   })
        // ).length;
        // if (
        //   milestone10Transferred < Math.floor(registeredReferred / objetivo)
        // ) {
        //   const milestone10 = await Milestone.findByPk(milestoneId);
        //   const faltante =
        //     Math.floor(registeredReferred / objetivo) - milestone10Transferred;
        //   for (let i = 0; i < faltante; i++) {
        //     await Award.create({
        //       tokenAmount: milestone10.tokenAmount,
        //       winnerId: id,
        //       milestoneId: milestone10.id,
        //     });
        //   }
        // }
        // //Control de milestones de 50 invitados
        // milestoneId = 4;
        // objetivo = 50;
        // const milestone50Transferred = (
        //   await Award.findAll({
        //     where: { milestoneId: milestoneId, winnerId: id },
        //   })
        // ).length;
        // if (
        //   milestone50Transferred < Math.floor(registeredReferred / objetivo)
        // ) {
        //   const milestone50 = await Milestone.findByPk(milestoneId);
        //   const faltante =
        //     Math.floor(registeredReferred / objetivo) - milestone50Transferred;
        //   for (let i = 0; i < faltante; i++) {
        //     await Award.create({
        //       tokenAmount: milestone50.tokenAmount,
        //       winnerId: id,
        //       milestoneId: milestone50.id,
        //     });
        //   }
        // }
        // //Control de milestones de 100 invitados
        // milestoneId = 5;
        // objetivo = 100;
        // const milestone100Transferred = (
        //   await Award.findAll({
        //     where: { milestoneId: milestoneId, winnerId: id },
        //   })
        // ).length;
        // if (
        //   milestone100Transferred < Math.floor(registeredReferred / objetivo)
        // ) {
        //   const milestone100 = await Milestone.findByPk(milestoneId);
        //   const faltante =
        //     Math.floor(registeredReferred / objetivo) - milestone100Transferred;
        //   for (let i = 0; i < faltante; i++) {
        //     await Award.create({
        //       tokenAmount: milestone100.tokenAmount,
        //       winnerId: id,
        //       milestoneId: milestone100.id,
        //     });
        //   }
        // }