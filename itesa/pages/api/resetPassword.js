const db = require("../../db/models/index");
const User = db.User;

export default async function newuser(req, res) {
  const { method } = req;
  const id = req.body.id;
  const password = req.body.password;

  switch (method) {
    case "PUT":
      {
        const user = await User.findByPk(id);

        user.password = password;

        user.save();

        res.send("Se ha actualizado la constraseña correctamente");
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
