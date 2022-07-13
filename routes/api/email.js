const express = require('express')
const router = express.Router()
const config = require('config')

// Mailgun Info
const mailgunApiKey = config.get('mailgun.mailgunApiKey')
const mailgunDomain = config.get('mailgun.domain')
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain })

router.post('/', async (req, res) => {

  console.log(req.body)

  res.json({
    success: true
  })
})

module.exports = router
