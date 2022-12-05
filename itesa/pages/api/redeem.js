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
      // //Ruta que devuelve el total de tokens a ser transferidos
      // {
      //   //Total de usuarios que se registraron con el viral_code el usuario
      //   const registeredReferred = (
      //     await Award.findAll({ where: { referringId: userId } })
      //   ).length;
      //   //Array con todos los objetos award en los que el usuario es el winnerId
      //   let awardsAchieved = await Award.findAll(
      //     { attributes: ["milestoneId"] },
      //     { where: { winnerId: userId } }
      //   );
      //   // Convierto el array en un array de milestoneId
      //   awardsAchieved = awardsAchieved.map(
      //     (elemento) => elemento.dataValues.milestoneId
      //   );
      //   // Array de {id,tokenAmount,tokenQuantity,expirationDate} de todos los milestone a cumplir por cantidad de referidos
      //   let currentAvailableMilestones = await Milestone.findAll({
      //     attributes: [
      //       "id",
      //       "tokenAmount",
      //       "quantityCondition",
      //       "expirationDate",
      //     ],
      //     where: { id: { [Op.notIn]: [1, 2] } }, //Excluyo los milestone de registro y de invitación
      //   });
      //   currentAvailableMilestones=currentAvailableMilestones.map(element=>element.dataValues)
        
      //   //Mapeo el array currentAvailableMilestones para chequear cada Milestone disponible

      //   const currentPromises = currentAvailableMilestones.map((elemento)=>{
      //     const today=new Date()
      //     const expiration = elemento.expirationDate || today.setDate(today.getDate()+30)
      //     if( new Date()< expiration){
      //       console.log("Ingresamos por fecha");
      //       if (registeredReferred >= elemento.quantityCondition && !awardsAchieved.includes(elemento.id)) {
      //         Award.create({
      //           tokenAmount: elemento.tokenAmount,
      //           winnerId: userId,
      //           milestoneId: elemento.id
      //         });
      //       }
      //     }
      //   })

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
