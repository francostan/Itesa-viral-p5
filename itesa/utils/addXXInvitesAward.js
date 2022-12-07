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