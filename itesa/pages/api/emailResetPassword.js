const db = require("../../db/models/index");
const User = db.User;
const nodemailer = require("nodemailer");
let handlebars = require("handlebars");
const fs = require("fs");

function emailResetPassword(req, res) {
  const { method, body } = req;

  console.log(req.body);

  switch (method) {
    case "POST": {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "itesa.getViral@gmail.com",
          pass: "rtspkviskcrhorey",
        },
      });

      fs.readFile(
        process.cwd() + "/views/pruebapassword.html",
        "utf-8",
        function (err, html) {
          if (err) {
            console.log(err);
            return;
          }
          let template = handlebars.compile(html);
          let replacements = {
            email: body.email,
            userId: body.id,
          };
          let htmlToSend = template(replacements);
          let mailOptions = {
            from: "GetViral",
            to: body.email,
            subject: "Recuperar Contraseña",
            html: htmlToSend,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error de mail");
              console.log(error.message);
              res.status(404).send();
              //.send(error.message);
            } else {
              res.status(200).send({
                email: null,
                nick_name: null,
                id: usuario.dataValues.id,
              });
            }
          });
          res.status(202).send();
        }
      );
    }
  }
}

export default emailResetPassword;
