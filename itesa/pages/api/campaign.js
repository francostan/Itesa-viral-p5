const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;

export default async function historicCampaign(req, res) {
  const { method, body } = req;
  const campaignId = body.campaignId;

  switch (method) {
    case "POST": {
      // Crea una nueva campaña
      //     newCampaign={
      //         expirationDate: Fecha en la que expirará la campaña (todos los milestones que la componen)
      //         milestones:[] Array con todos los milestones a agregar
      //     }
      //     milestone={
      //            name:
      //            desc:
      //            tokenAmount:
      //            quantityCondition:
      //     }
      const newCampaign = body.newCampaign;

      // Obtengo id de última campaña
      let campaigns = await Milestone.findAll({
        attributes: ["campaignId"],
        order: [["campaignId", "ASC"]],
      });
      campaigns = campaigns.map((element) => element.campaignId); // Queda un array de números (no objetos)
      campaigns = campaigns.filter(
        (item, index) => campaigns.indexOf(item) === index
      ); //Elimino duplicados


      const lastCampaignId=campaigns[campaigns.length-1]
      const campaignId=lastCampaignId+1  
      //Antes de insertar Milestones, si existe campaña vigente la forzará a expirar (setea expire en true, y currentCampaign en Awards a false)
      const expireOthers = await Milestone.update(
        { expired: true },
        { where: { expired: false } }
      );
      const expireAwards = await Award.update(
        { currentCampaign: false },
        { where: { currentCampaign: true } }
      );

      const milestoneArray = newCampaign.milestones.map(
        (element) =>
          (element = {
            name: element.name,
            desc: element.desc,
            tokenAmount: element.tokenAmount,
            quantityCondition: element.quantityCondition,
            expirationDate: newCampaign.expirationDate,
            campaignId: campaignId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
      );
      const create = await Milestone.bulkCreate(milestoneArray);
    }
    case "GET":
      {
        //Array de campaignId
        let campaigns = await Milestone.findAll({
          attributes: ["campaignId"],
          order: [["campaignId", "ASC"]],
        });
        campaigns = campaigns.map((element) => element.campaignId); // Queda un array de números (no objetos)
        campaigns = campaigns.filter(
          (item, index) => campaigns.indexOf(item) === index
        ); //Elimino duplicados

        campaigns = campaigns.map((element) => {
          let temp;
          element === 0
            ? (temp = "Ranking General")
            : (temp = `Campaña ${element}`);
          return { num: element, campaignName: temp };
        });
        res.status(200).send(campaigns); // Devuelve un array ordenado con todos los ids de las campañas registradas
      }

      break;

    default:
      break;
  }
}
