const { transporter, mailOptions } = require("../utils/nodemailer_utils");
const { BadRequestError } = require("../helpers/errors/badRequesteError");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  sendContactMail: async (req, res) => {
    const inputMail = {
      email: req.body.email,
      messageSubject: req.body.messageSubject,
      text: req.body.text,
    };

    for (const key in inputMail) {
      if (inputMail[key] == null) {
        throw new BadRequestError("Bad Request", `Input ${key} must be filled`);
      }
    }
    if (emailRegex.test(inputMail.email) == false) {
      throw new BadRequestError("Bad Request", "Invalid email");
    }

    const sendEmail = await transporter.sendMail({
      from: mailOptions.from,
      to: mailOptions.to,
      cc: inputMail.email,
      subject: inputMail.messageSubject,
      text: inputMail.text,
    });
  
    if (!sendEmail) {
      res.status(500).json({ error: "problème de mail" });
      console.log("Problem occured, aarrh", error);
    }
    res.status(201).json({ sendEmail });
    console.log("Email send with succes, yeah !");
  },
};