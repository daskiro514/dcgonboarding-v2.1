const express = require('express')
const router = express.Router()
const config = require('config')

// Mailgun Info
const mailgunApiKey = config.get('mailgun.mailgunApiKey')
const mailgunDomain = config.get('mailgun.domain')
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain })

router.post('/', async (req, res) => {

  console.log(req.body)
  var emailContentToPartner = {
    from: req.body.email,
    to: 'progdev77@gmail.com',
    subject: req.body.subject,
    text: `${req.body.name} sent a message.\n\n${req.body.message}`
  }

  mailgun.messages().send(emailContentToPartner, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true
  })
})

module.exports = router
