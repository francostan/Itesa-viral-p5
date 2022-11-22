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
        const foundUser = await User.findOne({
          where: { nick_name: body.nick_name },
        });
        if (!foundUser) res.status(204).send("");
        else {
          const validated = await foundUser.validatePassword(body.password);
          if (!validated) res.status(203).json("Contraseña incorrecta");
          else {
            var temp_secret = speakeasy.generateSecret({
              length: 30,
            });

            const { nick_name, email, id } = foundUser;
            const payload = { nick_name, email, id };
            const token = tokens.generateToken(payload);
            const cookies = new Cookies(req, res);
            cookies.set("getViral", JSON.stringify(token), {
              httpOnly: true,
            });

            await User.update(
              { secret: temp_secret.base32 },
              { where: { id } }
            );

            res.status(200).json(payload);
            const usuario = await User.findOne({ where: { id } });

            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "aromasjejeje@gmail.com",
                pass: "fuguxiirjiyqcrhp",
              },
            });
            let mailOptions = {
              from: "Aromas",
              to: "bautistagonzalezlazo@gmail.com",
              subject: "PROBANDO SECRET",
              text: ` Su clave es ${usuario.dataValues.secret} `,
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.status(500).send(error.message);
              } else {
                res.status(200).send(req.body);
              }
            });
          }
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
