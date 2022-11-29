const db = require("../../db/models/index");
const User = db.User;
const Award = db.Award;
const Milestone = db.Milestone;
const speakeasy = require("speakeasy");

export default async function newuser(req, res) {
  const { method, body } = req;
  const id = req.body.id;
  // const { nick_name, email, password } = body;
  // console.log("-=-------------------------", nick_name, email, password);
  
  switch (method) {
    case "POST":
      {
        // Creación de usuario
        const created = await User.create({
          nick_name: body.nick_name,
          email: body.email,
          password: body.password,
        });
        // Creación de award por registro
        const registerMilestone = await Milestone.findByPk(1);
        console.log("----------------------- registerMilestone",registerMilestone)
        console.log("-----------------")
        console.log("created: ",created.id);
        const registerAward = await Award.create({
          tokenAmount: registerMilestone.tokenAmount,
          winnerId:created.id,
          milestoneId:registerMilestone.id
        })
        console.log("-----------------")
        console.log("---------------------,CREATED",registerAward)
        // Para el caso en que el registro es con código de referido
        if (body.referring) {
          const referringUser = await User.findOne({
            where: { viral_code: body.referring },
          });
          Award.update({referringId:referringUser.id},{where:{id:registerAward.id}})
          const invitationMilestone = await Milestone.findByPk(2);
          const invitationAward = await Award.create({
            tokenAmount: invitationMilestone.tokenAmount,
            winnerId:referringUser.id,
            milestoneId:invitationMilestone.id
          })
        }

        res.json("Usuario creado con éxito");
      }
      break;
    case "GET":
      {
        const users = await User.findAll();

        res.send(users);
      }
      break;

    case "PUT":
      {
        const user = await User.findByPk(id);

        user.address = body.address;

        user.save();

        res.send("Se ha actualizado el address");
      }
      break;

    default:
      res.send("Otro método");
      break;
  }
}


// USANDO MAGIC METHODS DE SEQUELIZE

// const db = require("../../db/models/index");
// const User = db.User;
// const Award = db.Award;
// const Milestone = db.Milestone;
// const speakeasy = require("speakeasy");

// export default async function newuser(req, res) {
//   const { method, body } = req;
//   // const { nick_name, email, password } = body;
//   // console.log("-=-------------------------", nick_name, email, password);
//   switch (method) {
//     case "POST":
//       {
//         // Creación de usuario
//         const created = await User.create({
//           nick_name: body.nick_name,
//           email: body.email,
//           password: body.password,
//         });
//         // Creación de award por registro
//         const registerMilestone = await Milestone.findByPk(1);
//         const registerAward = await Award.create({
//           tokenAmount: registerMilestone.tokenAmount,
//         })
//           .then((result) => {
//             return result.setWinner(created);
//           })
//           .then((result) => {
//             return result.setMilestone(registerMilestone);
//           });
//         //Para el caso en que el registro es con código de referido
//         if (body.referring) {
//           const referringUser = await User.findOne({
//             where: { viral_code: body.referring },
//           });
//           registerAward.setReferring(referringUser);
//           const invitationMilestone = await Milestone.findByPk(2);
//           const invitationAward = await Award.create({
//             tokenAmount: invitationMilestone.tokenAmount,
//           })
//             .then((result) => {
//               return result.setWinner(referringUser);
//             })
//             .then((result) => {
//               return result.setMilestone(invitationMilestone);
//             });
//         }

//         res.json("Usuario creado con éxito");
//       }
//       break;
//     case "GET":
//       {
//         const users = await User.findAll();

//         res.send(users);
//       }
//       break;
//     default:
//       res.send("Otro método");
//       break;
//   }
// }
