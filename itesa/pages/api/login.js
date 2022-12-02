const db = require("../../db/models/index");
const User = db.User;
const tokens = require("../../auth/token/tokens");
const Cookies = require("cookies");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
let handlebars = require("handlebars");
const fs = require("fs");
export default async function login(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      {
        const foundUser = await User.findOne({
          where: { nick_name: body.nick_name },
        });
        if (!foundUser) res.status(204).send("");
        //Verifico que el usuario existe
        else {
          const validated = await foundUser.validatePassword(body.password); //Valido la constraseña
          if (!validated) res.status(203).json("Contraseña incorrecta");
          else {
            //Una vez valido, tengo que crearle el token numerico
            var temp_secret = speakeasy.generateSecret({
              //Genero código secreto de verificación para 2FA
            });

            //Actualizo en el usuario el código secreto de 2FA
            await User.update(
              { secret: temp_secret.base32 },
              { where: { id: foundUser.id } }
            );
            //Como la info dle usuario cambió, recuperamos de nuevo el usuario desde la DB
            const usuario = await User.findOne({ where: { id: foundUser.id } });
            //Enviamos el correo al usuario con el código 2FA

            var token = speakeasy.totp({
              secret: usuario.secret,
              encoding: "base32",
            });

            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "itesa.getViral@gmail.com",
                pass: "rtspkviskcrhorey",
              },
            });
            fs.readFile(
              process.cwd() + "/views/2fa.html",
              "utf-8",
              function (err, html) {
                if (err) {
                  console.log(err);
                  return;
                }
                let template = handlebars.compile(html);
                let replacements = {
                  userCode: token,
                };
                let htmlToSend = template(replacements);

                let mailOptions = {
                  from: "GetViral",
                  to: usuario.dataValues.email,
                  subject: "Verifica tu Identidad",
                  html: htmlToSend,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log(error.message);
                    //res.status(500).send(error.message);
                  } else {
                    res.status(200).send({
                      email: null,
                      nick_name: null,
                      id: usuario.dataValues.id,
                    });
                  }
                });
              }
            );
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
