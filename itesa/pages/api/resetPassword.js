const db = require("../../db/models/index");
const User = db.User;
const bc = require("bcrypt");
const speakeasy = require("speakeasy");

export default async function newuser(req, res) {
  const { method } = req;
  const email = req.body.email;
  const id = req.body.id;

  switch (method) {
    case "POST":
      {
        const user = await User.findOne({ where: { email } });
        res.send(user);
      }
      break;

    case "PUT":
      {
        const user = await User.findByPk(id);
        var validate = await speakeasy.totp.verify({
          secret: user.secret,
          encoding: "base32",
          token: req.body.secret,
          window: 5,
        });

        if (!validate) return res.status(404).json("Codigo incorrecto");

        const password = await bc.hash(req.body.password, user.salt);

        await User.update({ password }, { where: { id } });

        res.send("Se ha actualizado la constraseña correctamente");
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
