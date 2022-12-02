const db = require("../../db/models/index");
const User = db.User;

export default async function newuser(req, res) {
  const { method } = req;
  const email = req.body.email;
  const id = req.body.id;
  const password = req.body.password;

  switch (method) {
    case "POST":
      {
        const user = await User.findOne({ where: { email } });
        res.send(user);
      }
      break;

    case "PUT":
      {
        console.log("id", id);
        console.log("password", password);

        await User.update({ password }, { where: { id } });

        res.send("Se ha actualizado la constraseña correctamente");
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
