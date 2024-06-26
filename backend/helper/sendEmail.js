const nodemailer = require("nodemailer");
const ejs = require("ejs");
const sendEmail = async ({ viewFile, data, from, to, subject }) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL,
      },
    });

    let dataString = await ejs.renderFile("./views/" + viewFile + ".ejs", {
      data,
    });

    const mailOptions = {
      from,
      to,
      subject,
      html: dataString,
    };

    let info = await transport.sendMail(mailOptions);
    return info;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = sendEmail;
