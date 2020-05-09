import dotenv from "dotenv"
import sgMail from "@sendgrid/mail"

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: "danbueschlen@gmail.com",
  from: "hello@danbueschlen.ch",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

sgMail.send(msg).then(console.log).catch(console.error)
