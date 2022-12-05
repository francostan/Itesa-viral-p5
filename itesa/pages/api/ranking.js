const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;
const { Sequelize, Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

export default async function ranking(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      {
        //REESCRIBIR TODO ESTO PARA QUE CON EL MISMO CÓDIGO ENVÍO EL RANKING HISTÓRICO O DE UNA CAMPAñA EN PARTICULAR

        //PARA RANKING GENERAL
        //ranking: lista de usuarios registrados ordenados segun la cantidad de veces que su código de registro fue usado
        //SELECT 'referringId',count(*) FROM 'awards' AS 'award' where 'referringId' notnull GROUP BY 'referringId' order by 'referringId'
        let base_ranking_general = await Award.findAll({
          attributes: [
            "referringId",
            [Sequelize.fn("COUNT", Sequelize.col("*")), "awards"],
          ],
          where: { referringId: { [Op.ne]: null } },
          group: ["referringId"],
          order: [["awards", "DESC"]],
        });
        base_ranking_general = base_ranking_general.map(
          (elemento) => elemento.dataValues
        );

        const rankingPromisesGeneral = base_ranking_general.map((elemento) => {
          return User.findByPk(elemento.referringId);
        });
        const rankedUsersGeneral = await Promise.all(rankingPromisesGeneral);

        const usersRanking = base_ranking_general.map((elemento) => {
          const nickName = rankedUsersGeneral.find((user) => {
            if (user.id === elemento.referringId) return user.nick_name;
          });
          return { ...elemento, nick_name: nickName.dataValues.nick_name };
        });

        //PARA RANKING VIGENTE
        //ranking: lista de usuarios registrados ordenados segun la cantidad de veces que su código de registro fue usado, para una campaña en particular
        //SELECT 'referringId',count(*) FROM 'awards' AS 'award' where 'referringId' notnull and currentCampaign=true GROUP BY 'referringId' order by 'referringId'
        let base_ranking_current = await Award.findAll({
          attributes: [
            "referringId",
            [Sequelize.fn("COUNT", Sequelize.col("*")), "awards"],
          ],
          where: { referringId: { [Op.ne]: null }, currentCampaign: true },
          group: ["referringId"],
          order: [["awards", "DESC"]],
        });
        base_ranking_current = base_ranking_current.map(
          (elemento) => elemento.dataValues
        );

        const rankingPromisesCurrent = base_ranking_current.map((elemento) => {
          return User.findByPk(elemento.referringId);
        });
        const rankedUsersCurrent = await Promise.all(rankingPromisesCurrent);

        const usersRankingCurrent = base_ranking_current.map((elemento) => {
          const nickName = rankedUsersCurrent.find((user) => {
            if (user.id === elemento.referringId) return user.nick_name;
          });
          return { ...elemento, nick_name: nickName.dataValues.nick_name };
        });

        res.status(200).send({ usersRanking, usersRankingCurrent });
      }
      break;
    case "POST":
      {
        // PARA RANKING PARTICULAR
        const campaignId = body.campaignId;
        let requiredRanking;
        if (campaignId == 0) {
          requiredRanking = await Award.findAll({
            attributes: [
              "referringId",
              [Sequelize.fn("COUNT", Sequelize.col("*")), "awards"],
            ],
            where: { referringId: { [Op.ne]: null }},
            group: ["referringId"],
            order: [["awards", "DESC"]],
          }
          );
        } else {
          requiredRanking = await Award.findAll({
            attributes: [
              "referringId",
              [Sequelize.fn("COUNT", Sequelize.col("*")), "awards"],
            ],
            where: { referringId: { [Op.ne]: null },campaignId:campaignId},
            group: ["referringId"],
            order: [["awards", "DESC"]],
          });
        }

        requiredRanking = requiredRanking.map(
          (elemento) => elemento.dataValues
        );

        const rankingPromises = requiredRanking.map((elemento) => {
          return User.findByPk(elemento.referringId);
        });
        const rankedUsers = await Promise.all(rankingPromises);

        const usersRanking = requiredRanking.map((elemento) => {
          const nickName = rankedUsers.find((user) => {
            if (user.id === elemento.referringId) return user.nick_name;
          });
          return { ...elemento, nick_name: nickName.dataValues.nick_name };
        });
        res.status(200).send(usersRanking);
      }
      break;

    default:
      break;
  }
}
