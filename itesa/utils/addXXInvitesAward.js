const db = require("../db/models/index");
const Award = db.Award;

export default async function addXXInvitesAward(userId,registeredReferred,awardsAchieved, milestoneId, tokenAmount, quantityCondition) {
  if (registeredReferred >= quantityCondition && !awardsAchieved.includes(milestoneId)) {
    await Award.create({
      tokenAmount: tokenAmount,
      winnerId: userId,
      milestoneId: milestoneId
    });
  }
}











// //Total de usuarios que se registraron con el viral_code el usuario
// const registeredReferred = (
//   await Award.findAll({ where: { referringId: id } })
// ).length;
// //Array con todos los objetos award en los que el usuario es el winnerId
// let awardsAchieved = await Award.findAll(
//   { attributes: ["milestoneId"] },
//   { where: { winnerId: id } }
// );
// // Ahora el array es un array de milestoneId
// awardsAchieved = awardsAchieved.map(
//   (elemento) => elemento.dataValues.milestoneId
// );