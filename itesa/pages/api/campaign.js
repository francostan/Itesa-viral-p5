const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;

export default async function historicCampaign(req,res){
    const {method,body}=req
    const campaignId=body.campaignId
    switch (method) {

        case "POST":{ // Devuelve la campaña que está vigente, o 0 si no hay ninguna vigente
            

        }
        case "GET":{
            let campaigns = await Milestone.findAll({attributes:["campaignId"],order:[["campaignId","ASC"]]})
            campaigns=campaigns.map(element=>element.campaignId) // Queda un array de números (no objetos)
            campaigns=campaigns.filter((item,index) => campaigns.indexOf(item) === index) //Elimino duplicados

            campaigns=campaigns.map((element)=>{
                let temp
                element===0? temp="Ranking General":temp=`Campaña ${element}`
                return {num:element,campaignName:temp}
              })
            res.status(200).send(campaigns) // Devuelve un array ordenado con todos los ids de las campañas registradas
        }
            
            break;
    
        default:
            break;
    }
}