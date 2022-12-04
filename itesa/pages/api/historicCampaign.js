const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;

export default async function historicCampaign(req,res){
    const {method,body}=req
    const campaignId=body.campaignId
    switch (method) {
        case "POST":{
            if(campaignId===0){
                
            }

        }
            
            break;
    
        default:
            break;
    }
}