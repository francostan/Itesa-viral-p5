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

            console.log("TEMPSECRET>>>>>>", temp_secret);

            //Actualizo en el usuario el código secreto de 2FA
            await User.update(
              { secret: temp_secret.base32 },
              { where: { id: foundUser.id } }
            );
            //Como la info dle usuario cambió, recuperamos de nuevo el usuario desde la DB
            const usuario = await User.findOne({ where: { id: foundUser.id } });
            //Enviamos el correo al usuario con el código 2FA

            console.log(">>>>>>>>>>>>>>", usuario.secret);

            // var token = speakeasy.totp({
            //   secret: usuario.secret.base32,
            //   encoding: "base32",
            // });

            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "aromasjejeje@gmail.com",
                pass: "fuguxiirjiyqcrhp",
              },
            });
            let mailOptions = {
              from: "GetViral",
              to: usuario.dataValues.email,
              subject: "Verifica tu Identidad",
              text: `Por favor, ingresa el siguiente código en la pantalla de Login ${usuario.dataValues.secret}`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log("Error de mail");
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
