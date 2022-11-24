const db = require("../../db/models/index");
const User = db.User;
//const Cookies = require("cookies");
import { sign } from "../../auth/token/tokens";


export default async function newuser(req,res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      {
        const foundUser = await User.findByPk(body.id);
        if (foundUser.secret === body.secret) {
          //Generación de Cookie y guardado en browser
          const { nick_name, email, id } = foundUser;
          const payload = { nick_name, email, id };
          const token = await sign(payload)
          res.setHeader("set-cookie",`getViral=${token}; path=/; samesite=lax; httponly`)
          res
            .status(200)
            .send({
              nick_name: foundUser.nick_name,
              id: foundUser.id,
              email: foundUser.email,
            });
        }else{
          res.status(403).json("Código 2FA incorrecto")
        }
      }

      break;
    case "GET":
      {
        res.json("Llegaste a GET");
      }
      break;
    default:
      res.send("Otro método");
      break;
  }
}
