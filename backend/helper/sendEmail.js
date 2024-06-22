const nodemailer = require("nodemailer");
const ejs = require("ejs");
const sendEmail = async ({ viewFile, data, from, to, subject }) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7e92e02e004915",
        pass: "3f86d4450ef3ef",
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
