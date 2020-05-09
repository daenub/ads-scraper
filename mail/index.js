import dotenv from "dotenv"
import sgMail from "@sendgrid/mail"

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export function sendResults(markup) {
  const msg = {
    to: "danbueschlen@gmail.com",
    from: "hello@danbueschlen.ch",
    subject: "Ads Result",
    text: "TEST",
    html: markup,
  }

  return sgMail.send(msg)
}
