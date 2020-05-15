import dotenv from "dotenv"
import sgMail from "@sendgrid/mail"

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function getFormatedDate() {
  const d = new Date()

  return `${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
}

export function sendResults(results) {
  const date = getFormatedDate()

  const msg = {
    to: process.env.MAIL_RECIPIENTS.split(","),
    from: process.env.MAIL_SENDER,
    subject: `${date} – Ads Scraper Results`,
    text: `Your daily ad scraper results (${date})`,
    html: mailTemplate(date, results),
  }

  return sgMail.send(msg)
}

const mailTemplate = (date, results) => `
  <h1>We've found new ad's!</h1>
  <time>${date}</time>
  ${results.reduce((str, result) => {
    return (
      str +
      `
        <h2>
          ${result.query}
        </h2>
        ${result.markup}
      `
    )
  }, "")}
`
