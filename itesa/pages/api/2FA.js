import user from "../../db/models/user";

const db = require("../../db/models/index");
const User = db.User;
const tokens = require("../../middleware/token/tokens");
const Cookies = require("cookies");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

export default async function newuser(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      {
        const foundSecret = await User.findOne({
          where: { secret: body.secret },
        });
        console.log(foundSecret.dataValues, "este es el ususario");

        // if (!foundSecret) res.status(204).send("");
        // else {
        //   console.log("Funciona secret", foundSecret);
        // }
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
