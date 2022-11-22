const db = require("../../db/models/index");
const User = db.User;
const speakeasy = require("speakeasy");

export default async function newuser(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      {
        const created = await User.create(body);
        res.json(created);
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
