const db = require("../../db/models/index");
const User = db.User;

const Milestone = db.Milestone;

export default async function adminMilestones(req, res) {
  const { method } = req;
  const { name, desc, tokenAmount, id } = req.body;
  switch (method) {
    case "POST":
      try {
        let milestone = await Milestone.create({ name, desc, tokenAmount });

        res.send(milestone);
      } catch (error) {
        console.log(error);
      }

      break;
    case "GET":
      try {
        if (req.body.id) {
          console.log("hola id2");
          let milestoneid = await Milestone.findOne({
            where: { id },
          });
          res.send(milestoneid);
        } else {
          console.log(req.body.id);
          console.log("holas");
          let milestoneAll = await Milestone.findAll({
            order: [["id", "ASC"]],
          });
          res.send(milestoneAll);
        }
      } catch (error) {
        console.log(error);
      }

      break;
    case "PUT":
      try {
        console.log("hola", req.body);

        let milestoneid = await Milestone.findOne({
          where: { id },
        });
        await milestoneid.update({ name, desc, tokenAmount });
        res.send("se ha actualizado");
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        let milestoneid = await Milestone.destroy({
          where: { id },
        });

        res.send("se ha eliminado");
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      break;
  }
}
