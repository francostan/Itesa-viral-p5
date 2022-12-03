const db = require("../../db/models/index");
const User = db.User;

const Milestone = db.Milestone;

export default async function adminMilestones(req, res) {
  const { method } = req;
  const { name, desc, tokenAmount, id, expirationDate, quantityCondition } =
    req.body;
  switch (method) {
    case "POST":
      try {
        let milestone = await Milestone.create({
          name,
          desc,
          tokenAmount,
          id,
          expirationDate,
          quantityCondition,
        });

        res.send(milestone);
      } catch (error) {
        console.log(error);
      }

      break;
    case "GET":
      try {
        if (req.body.id) {
          let milestoneid = await Milestone.findOne({
            where: { id },
          });
          res.send(milestoneid);
        } else {
          let milestoneAll = await Milestone.findAll({
            where: { deleted: false },
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
        let milestoneid = await Milestone.findOne({
          where: { id },
        });
        await milestoneid.update({
          name,
          desc,
          tokenAmount,
          id,
          expirationDate,
          quantityCondition,
        });
        res.send("se ha actualizado");
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        console.log("ENTRAMOS A DELETE", req.body);
        let milestoneid = await Milestone.update(
          { deleted: true },
          {
            where: { id },
          }
        );

        res.send("se ha eliminado");
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      break;
  }
}
