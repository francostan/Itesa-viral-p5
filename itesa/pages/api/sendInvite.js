const db = require("../../db/models/index");
const User = db.User;
const nodemailer = require("nodemailer");

// req.body={
//     email:
//     user.viral_code ("invitante")
//     custom_text:
// }

export default function invite(req, res) {
  const { method, body } = req;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "itesa.getViral@gmail.com",
      pass: "rtspkviskcrhorey",
    },
  });
  let mailOptions = {
    from: "GetViral",
    to: body.email,
    subject: "BIENVENIDO!!!!",
    text: `
    ${body.custom_text}

    Para reclamar tus tokens, por favor registrate en el sigiuiente link!!: 
    http://localhost:3000/register/${body.user.viral_code}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error de mail");
      console.log(error.message);
      //res.status(500).send(error.message);
    } else {
      res.status(200).send({
        email: null,
        nick_name: null,
        id: usuario.dataValues.id,
      });
    }
  });
  res.status(202).send()
}