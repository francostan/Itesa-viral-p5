import { Op } from "sequelize";

const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;

export default async function AdminMilestones(req, res) {
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
        let campaigns = await Milestone.findAll({
          where: { expired: false },
          order: [
            ["id", "ASC"],
            ["campaignId", "ASC"],
          ],
        });
        let currentCampaignId;
        if (campaigns.length > 0) {
          currentCampaignId =
            campaigns[campaigns.length - 1].dataValues.campaignId;
        } else {
          currentCampaignId = 0;
        }
        if (req.body.id) {
          let milestoneid = await Milestone.findOne({
            where: { id },
          });
          res.send(milestoneid);
        } else {
          let milestoneAll = await Milestone.findAll({
            where: {
              deleted: false,
              campaignId: { [Op.in]: [0, currentCampaignId] },
            },
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
