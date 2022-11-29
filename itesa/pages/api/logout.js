export default async function logout(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      {
        res
          .setHeader(
            "Set-Cookie",
            "getViral=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
          )
          .send();
      }
      break;
    default:
      res.send("Otro método");
      break;
  }
}
