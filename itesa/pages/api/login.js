import user from "../../db/models/user";

const db = require("../../db/models/index");
const User = db.User;
const tokens = require("../../auth/token/tokens");
const Cookies = require("cookies");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");

export default async function login(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      {
        const foundUser = await User.findOne({
          where: { nick_name: body.nick_name },
        });
        if (!foundUser)
          res.status(204).send(""); //Verifico que el usuario existe
        else {
          const validated = await foundUser.validatePassword(body.password); //Valido la constraseña
          if (!validated) res.status(203).json("Contraseña incorrecta");
          else {
            //Una vez valido, tengo que crearle el token numerico
            var token = speakeasy.totp({
              secret: foundUser.secret.base32,
              encoding: "base32",
              time: 60,
            });
            console.log("---------------------------TOKEN:", token);
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "aromasjejeje@gmail.com",
                pass: "fuguxiirjiyqcrhp",
              },
            });
            let mailOptions = {
              from: "GetViral",
              to: foundUser.dataValues.email,
              subject: "Verifica tu Identidad",
              text: `Por favor, ingresa el siguiente código en la pantalla de Login ${token}`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log("Error de mail");
                console.log(error.message);
                //res.status(500).send(error.message);
              } else {
                res.status(200).send({email:null,nick_name:null, id:foundUser.dataValues.id});
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
