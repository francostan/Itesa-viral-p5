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
        //ranking: lista de usuarios registrados ordenados segun la cantidad de veces que su código de registro fue usado
        //SELECT 'referringId',count(*) FROM 'awards' AS 'award' where 'referringId' notnull GROUP BY 'referringId' order by 'referringId'
        let base_ranking = await Award.findAll({
          attributes: [
            "referringId",
            [Sequelize.fn("COUNT", Sequelize.col("*")), "awards"],
          ],
          where: { referringId: { [Op.ne]: null } },
          group: ["referringId"],
          order: [["awards", "DESC"]],
        });
        base_ranking=base_ranking.map(elemento=>elemento.dataValues)

        const rankingPromises = base_ranking.map((elemento) => {
          return User.findByPk(elemento.referringId);
        });
        const rankedUsers=await Promise.all(rankingPromises)

        const ranking=base_ranking.map((elemento)=>{
            const nickName=rankedUsers.find(user=>{if(user.id===elemento.referringId) return user.nick_name})
            return {...elemento, nick_name:nickName.dataValues.nick_name}
        })

        res.status(200).send(ranking);
      }
      break;
    case value:
      break;

    default:
      break;
  }
}
