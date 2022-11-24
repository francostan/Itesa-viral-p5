const db = require("../../db/models/index");

const User = db.User;
const tokens = require("../../middleware/token/tokens");
const Cookies = require("cookies");

export default async function me(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      {
        // const created = await User.create(body);
        // res.json("Usuario creado con éxito");
      }
      break;
    case "GET":
      {
        console.log("hola");
        const cookies = new Cookies(req, res);
        const token = cookies.get("getViral");
        if (!token)
          return res.status(200).json({ nick_name: "", email: "", id: "" });
        const payload = tokens.validateToken(JSON.parse(token));
        res.send(payload);
        // console.log(validateAuth);
        // const payload = validateAuth();
        // console.log(payload);
        // res.send(payload);
      }
      break;
    default:
      res.send("Otro método");
      break;
  }
}
