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
        "/home/santiago/Bootcamp/Itesa/Itesa-viral-p5/itesa/views/mail.html",
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

export default invite;
/* 
Achicar los formularios de registro para vista web
las alertas que pasen como esta campo requerido para que no sea invasivo
arreglar errores



nice to have


pasar a disable el billetera conectada

codigo de confirmacion cuando le erras

*/
//Pagína con formulario para invitar a conocidos

//Está pagina necesita formulario con dirección de correo de destinatario
//La ruta debe registrar en la DB, tabla invitations la nueva relación
//La db dispone de toda la info del usuario, y dle invitado; la relación queda en "false"
//Se envía un mail al invitado con el link a la página "acceptInvitation"
