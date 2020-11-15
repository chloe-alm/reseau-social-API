var nodemailer = require("nodemailer");
require("dotenv").config();
const NODEMAILER_PSW = process.env.NODEMAILER_PSW

module.exports = {
    transporter: nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "code.dev.chloe@gmail.com",
        pass: NODEMAILER_PSW,
    },
    }),
    

    mailOptions: {
    from: "code.dev.chloe@gmail.com",
    to: "cdargelez@gmail.com",
    cc : "",
    subject: "message",
    text: "This is a text",
    },
    
}
