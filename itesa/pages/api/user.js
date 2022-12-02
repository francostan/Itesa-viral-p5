const db = require("../../db/models/index");
const User = db.User;

export default async function newuser(req, res) {
  const { method } = req;
  const id = req.body.id;

  console.log("IDDD>>>>", req.body);

  switch (method) {
    case "POST":
      {
        const user = await User.findOne({ where: { id } });
        res.send(user);
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}
