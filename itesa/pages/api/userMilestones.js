const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;

export default async function userMilestones(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      // body={
      //     user:id
      // }
      const availableMilestones = await Milestone.findAll({
        attributes: ["id"],
        order: [["id", "DESC"]],
      });
      const completedMilestones = await Award.findAll({
        attributes: ["milestoneId"],
        group: ["milestoneId"],
        where: { winnerId: body.user },
        order: [["milestoneId", "DESC"]],
      });
      const lastMilestone = await Milestone.findByPk(
        completedMilestones[0].milestoneId
      );
        let nextMilestone
      if (availableMilestones[0].id > completedMilestones[0].milestoneId) {
        nextMilestone = await Milestone.findByPk(
          completedMilestones[0].milestoneId + 1
        )
      }else{
        nextMilestone={milestoneId:"You Got the Last One!",name:"More coming soon",desc:"Check Back"}
      }

      
      res.status(200).send({lastMilestone,nextMilestone});

      break;

    default:
      break;
  }
}
