const db = require("../../db/models/index");
const User = db.User;

export default async function newuser(req, res) {
  const { method } = req;
  const email = req.body.email;
  const id = req.body.id;
  const password = req.body.password;

  console.log("REQQQQ BODYYYYY>>>>", req.body);

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
