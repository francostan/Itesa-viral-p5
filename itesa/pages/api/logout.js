const db = require("../../db/models/index");
const User = db.User;
const Cookies = require("cookies");

export default async function logout (req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":{
        console.log("Deberiamos borrar cookie")
        const cookies=new Cookies(req,res)
        cookies.set('getViral')
        
    }
      break;
    default:res.send("Otro método")
      break;
  }
};
