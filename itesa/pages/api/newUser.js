const db = require("../../db/models/index");
const User = db.User;
const speakeasy = require("speakeasy");

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      {
        const created = await User.create(body);

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
