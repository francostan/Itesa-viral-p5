const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;
const { Sequelize, Op } = require("sequelize");

export default async function dashboard(req, res) {
  const { method, post } = req;
  switch (method) {
    case "GET":
      {
        let totUsers = await User.findAll({
          attributes: [[Sequelize.fn("COUNT", Sequelize.col("*")), "Users"]],
        });
        totUsers = totUsers[0];
        let totTokens = await Award.findAll({
          attributes: [
            [Sequelize.fn("SUM", Sequelize.col("tokenAmount")), "Tokens"],
          ],
        });
        totTokens = totTokens[0];

        let historicRegistration = await Award.findAll({
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("*")), "Users"],
            "campaignId",
          ],
          group: [["campaignId", "ASC"]],
        });
        let historicEmission = await Award.findAll({
          attributes: [
            [Sequelize.fn("SUM", Sequelize.col("tokenAmount")), "Tokens"],
            "campaignId",
          ],
          group: [["campaignId", "ASC"]],
        });

        res.status(200).send({ totUsers, totTokens, historicRegistration, historicEmission});
      }

      break;

    default:
      break;
  }
}
