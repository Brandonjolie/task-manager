const sgMail = require('@sendgrid/mail')
const from = process.env.FROM
const key = process.env.SENDEMAILKEY
sgMail.setApiKey(key)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        from,
        to: email,
        subject: `Hi ${name}!`,
        text: `Welcome to the app ${name}. Let me know how you get along with the app`

    })
}

const sendLeavingEmail = (email, name) => {
    sgMail.send({
        from,
        to: email,
        subject: `This is goodbye!`,
        text: `Sad to see you go ${name} 😭.`,

    })
}
module.exports = { sendWelcomeEmail, sendLeavingEmail }