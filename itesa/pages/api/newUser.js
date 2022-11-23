const db = require("../../db/models/index");
const User = db.User;
const speakeasy = require("speakeasy");

export default async function newuser(req, res) {
  const { method, body } = req;
  // const { nick_name, email, password } = body;
  // console.log("-=-------------------------", nick_name, email, password);
  switch (method) {
    case "POST":
      {
        var secret = speakeasy.generateSecret({
          //Genero código secreto de verificación para 2FA
          length: 30,
        });
        const created = await User.create({
          nick_name: body.nick_name,
          email: body.email,
          password: body.password,
          secret: secret.base32,
        });

        res.json("Usuario creado con éxito");
      }
      break;
    case "GET":
      {
        const users = await User.findAll();

        res.send(users);
      }
      break;
    default:
      res.send("Otro método");
      break;
  }
}
