import db from "../../../models/index";
// import { User } from "../../../models/user";
db.sequelize.sync();
const User = db.User;

export default async function (req, res) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.findOne({ where: { id } });

        return res.send(users);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }

    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}
