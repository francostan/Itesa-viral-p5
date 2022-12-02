const db = require("../../db/models/index");
const User = db.User;
const bc = require("bcrypt");

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
        const password = await bc.hash(req.body.password, user.salt);

        console.log("PASSWORD", password);

        // user.password = password;
        // console.log("USERPASSWORD>>>", user.password);

        // user.save();

        await User.update({ password }, { where: { id } });

        res.send("Se ha actualizado la constraseña correctamente");
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
