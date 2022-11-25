const db = require("../../db/models/index");
const User=db.User
export default async function linkAddress(req, res) {
    const { method, body } = req;
    switch (method) {
      case "PUT":
        {
          User.update({address:body.address},{where:{id:body.id},individualHooks:true})
          res.send("Address Guardada")
        }
        break;
      default:
        res.send("Otro método");
        break;
    }
  }