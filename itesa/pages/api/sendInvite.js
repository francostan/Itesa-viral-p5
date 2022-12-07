const db = require("../../db/models/index");
const User = db.User;
const nodemailer = require("nodemailer");
let handlebars = require("handlebars");
const fs = require("fs");

function invite(req, res) {
  const { method, body } = req;
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
        process.cwd() + "/views/mail.html",
        "utf-8",
        function (err, html) {
          if (err) {
            console.log(err);
            return;
          }
          let template = handlebars.compile(html);
          let replacements = {
            user: body.user,
            mensaje: body.custom_text,
            userCode: body.viral_code,
          };
          let htmlToSend = template(replacements);
          let mailOptions = {
            from: "GetViral",
            to: body.email,
            subject: "Invitacion a Get Viral",
            html: htmlToSend,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
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

export default invite;

