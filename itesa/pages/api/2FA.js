import user from "../../db/models/user";

const db = require("../../db/models/index");
const User = db.User;
const tokens = require("../../middleware/token/tokens");
const Cookies = require("cookies");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

export default async function newuser(req, res) {
  const { method, body } = req;
  console.log("Body====================", body);
  switch (method) {
    case "POST":
      {
        const foundUser = await User.findByPk(body.id);
        var validate = speakeasy.totp.verify({
          secret: foundUser.secret.base32,
          encoding: "base32",
          token: body.token,
          window: 0,
        });
        // console.log("&&&&&&&&&&&&&&&&&& verifico?:", validate);
        if (validate) {
          //Generación de Cookie y guardado en browser
          const { nick_name, email, id } = foundUser;
          const payload = { nick_name, email, id };
          const token = JSON.stringify(tokens.generateToken(payload));
          const cookies = new Cookies(req, res);
          cookies.set("getViral", token);
          res.status(200).send({
            nick_name: foundUser.nick_name,
            id: foundUser.id,
            email: foundUser.email,
          });
        } else {
          res.status(403).json("Código 2FA incorrecto");
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
