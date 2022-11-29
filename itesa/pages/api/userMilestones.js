const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;

export default function userMilestones(req,res){
    const {method,body}=req
    switch (method) {
        case "POST":
            // body={
            //     user:{objetoUser}
            // }
            const completedMilestones=Award.findAll({where:{winnerId:body.user.id,transferred:true}})
            

            
            break;
        
        default:
            break;
    }
}