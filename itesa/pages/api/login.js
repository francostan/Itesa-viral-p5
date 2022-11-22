const db = require("../../db/models/index");
const User = db.User;
const tokens = require("../../middleware/token/tokens");
const Cookies = require("cookies");

export default async function newuser(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      {
        const foundUser = await User.findOne({
          where: { nick_name: body.nick_name },
        });
        if (!foundUser) res.status(204).send("");
        else {
          const validated=await foundUser.validatePassword(body.password)
          if (!validated)
            res.status(203).json("Contraseña incorrecta");
          else {
            const { nick_name, email, id } = foundUser;
            const payload = { nick_name, email, id };
            const token = tokens.generateToken(payload);
            const cookies = new Cookies(req, res);
            cookies.set("getViral", JSON.stringify(token), {
              httpOnly: true,
            });
            res.status(200).json(payload);
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
