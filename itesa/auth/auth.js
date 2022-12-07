const Cookies = require("cookies");
const tokens = require("./token/tokens");

export default function validateAuth(req, res) {
  const cookies = new Cookies(req, res);

  const token = cookies.get("getViral");

  if (!token) return res.status(401).send("no esta el token");
  const payload = tokens.validateToken(JSON.parse(token));
  if (!payload) return res.status(401).send("no se valida");

  return payload;


}
