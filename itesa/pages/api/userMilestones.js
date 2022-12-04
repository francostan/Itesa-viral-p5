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
        where: { expired: false },
        order: [["id", "DESC"]],
      });
      let nextMilestone;
      if (availableMilestones.length > 0) {
        const completedMilestones = await Award.findAll({
          attributes: ["milestoneId"],
          group: ["milestoneId"],
          where: { winnerId: body.user },
          order: [["milestoneId", "DESC"]],
        });
        if (availableMilestones[0].id > completedMilestones[0].milestoneId) {
          nextMilestone = await Milestone.findByPk(
            completedMilestones[0].milestoneId + 1
          );
        } else {
          nextMilestone = {
            id: null,
            milestoneId: "Conseguiste Todos",
            name: "A esperar la siguiente campaña",
            desc: "",
          };
        }
      } else {
          nextMilestone = {
          id: null,
          milestoneId: "",
          name: "A esperar la siguiente campaña",
          desc: "",
        };
      }

      res.status(200).send({nextMilestone });

      break;

    default:
      break;
  }
}
