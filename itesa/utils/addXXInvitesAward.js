const db = require("../db/models/index");
const Award = db.Award;
const Milestone = db.Milestone;

export default async function addXXInvitesAward(id, milestoneId, reqQuantity) {
  //Total de usuarios que se registraron con el viral_code el usuario
  const registeredReferred = (
    await Award.findAll({ where: { referringId: id } })
  ).length;
  //Array con todos los objetos award en los que el usuario es el winnerId
  let awardsAchieved = await Award.findAll(
    { attributes: ["milestoneId"] },
    { where: { winnerId: id } }
  );
  // Ahora el array es un array de milestoneId
  awardsAchieved = awardsAchieved.map(
    (elemento) => elemento.dataValues.milestoneId
  );
  if (registeredReferred >= reqQuantity && !awardsAchieved.includes(milestoneId)) {
    const milestone = await Milestone.findByPk(milestoneId);
    await Award.create({
      tokenAmount: milestone.tokenAmount,
      winnerId: id,
      milestoneId: milestone.id,
    });
  }
}
