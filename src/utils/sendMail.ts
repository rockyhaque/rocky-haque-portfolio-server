import nodemailer from 'nodemailer'

const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'rockyhaque99@gmail.com',
      pass: 'eluv ckwr fkpg zsqi',
    },
  })

  await transporter.sendMail({
    from: '"Bi-Cycle Store 👻" <rockyhaque99@gmail.com>', // sender address
    to,
    subject,
    text: 'Hello world?', // plain text body
    html,
  })
}

export default sendMail
