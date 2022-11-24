const db = require("../../db/models/index");
import {verify} from "../../auth/token/tokens"
const Cookies = require("cookies");

export default async function me(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      {
        const cookies = new Cookies(req, res);
        const token = cookies.get("getViral");
        if(!token) return res.status(200).json({nick_name:"",email:"",id:""})
        const payload = await verify(token);
        res.send(payload);
      }
      break;
    default:
      res.send("Otro método");
      break;
  }
}
