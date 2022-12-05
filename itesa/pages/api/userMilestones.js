import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";

const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;
const { Sequelize, Op } = require("sequelize");

export default async function userMilestones(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      // body={
      //     user:id
      // }
      const availableMilestones = await Milestone.findAll({
        //Devuelve array con id de todos los milestones disponibles
        attributes: ["id", "campaignId"],
        where: { expired: false },
        order: [["id", "DESC"]],
      });
      const currentCampaignId = availableMilestones[0].dataValues.campaignId;
      let nextMilestone;
      if (availableMilestones.length > 0) {
        //si availableMilestones.length es mayor a 0 es que hay milestones disponibles
        let completedMilestones = await Award.findAll({
          attributes: ["milestoneId"],
          group: ["milestoneId"],
          where: { winnerId: body.user,milestoneId:{[Op.notIn]:[1,2]}, currentCampaign: true },
          order: [["milestoneId", "DESC"]],
        }); // completedMilestones es un array con todos los milestoneId que el usuario completó ordenados de forma descencente (el último completado queda primero)
        //Si no hay milestones completados, el nextMilestone es el primero de la campaña
        if (completedMilestones.length === 0) {
          nextMilestone = await Milestone.findByPk(
            availableMilestones[availableMilestones.length - 1].id
          );
        } else {
          if (availableMilestones[0].id > completedMilestones[0].milestoneId) {
            console.log("availableMilestones[0].id > completedMilestones[0].milestoneId");
            nextMilestone = await Milestone.findByPk(
              completedMilestones[0].milestoneId + 1
            );
          } else {
            console.log("availableMilestones[0].id = completedMilestones[0].milestoneId");
            nextMilestone = {
              id: null,
              milestoneId: "Conseguiste Todos",
              name: "A esperar la siguiente campaña",
              desc: "",
            };
          }
        }
      } else {
        nextMilestone = {
          id: null,
          milestoneId: "",
          name: "A esperar la siguiente campaña",
          desc: "",
        };
      }

      res.status(200).send({ nextMilestone });

      break;

    default:
      break;
  }
}
