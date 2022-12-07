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
        ////////////////////////////////////
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
        ///////////////////////////////////
        let historicRegistration = await Award.findAll({
          attributes: [
            [Sequelize.fn("COUNT", Sequelize.col("*")), "Users"],
            "campaignId",
          ],
          where: { milestoneId: 1 },
          group: [["campaignId", "ASC"]],
        });

        let lastCampaign = await Milestone.findAll({
          attributes: ["campaignId"],
          order: [["campaignId", "DESC"]],
        });
        lastCampaign = lastCampaign[0].campaignId;

        let campaigns = []; //Será el eje de campañas en el gráfico del dashboard
        for (let i = 0; i <= lastCampaign; i++) {
          campaigns.push(i);
        }

        let registers = [];

        campaigns.map((element) => {
          if (
            historicRegistration.find((award) => award.campaignId === element)
          ) {
            let temp=historicRegistration.find((award) => award.campaignId === element);
            registers.push(Number(temp.dataValues.Users))
          } else registers.push(0);
        });
        historicRegistration = {
          campaigns: campaigns,
          Registrations: registers,
        };
        ///////////////////////////////////

        let historicEmission = await Award.findAll({
          attributes: [
            [Sequelize.fn("SUM", Sequelize.col("tokenAmount")), "Tokens"],
            "campaignId",
          ],
          group: [["campaignId", "ASC"]],
        });
        let emissions=[]
        campaigns.map((element)=>{
          if (
            historicEmission.find((award) => award.campaignId === element)
          ) {
            let temp=historicEmission.find((award) => award.campaignId === element);
            emissions.push(Number(temp.dataValues.Tokens))
          } else emissions.push(0);
        });
        historicEmission={
          campaigns:campaigns,
          emissions:emissions
        }
        res.status(200).json({
          totUsers,
          totTokens,
          historicRegistration,
          historicEmission,
        });
      }

      break;

    default:
      break;
  }
}
