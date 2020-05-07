const dotenv = require("dotenv")
dotenv.config()

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

console.log(process.env.SENDGRID_API_KEY)

const msg = {
  to: 'danbueschlen@gmail.com',
  from: 'hello@danbueschlen.ch',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(msg).then(console.log).catch(console.error)
