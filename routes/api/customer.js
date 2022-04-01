const express = require('express')
const router = express.Router()
const config = require('config')

// Stripe Info
const secret_key = config.get('stripe.secret_key')
const stripe = require('stripe')(secret_key)

// Mailgun Info
const mailgunApiKey = config.get('mailgun.mailgunApiKey')
const mailgunDomain = config.get('mailgun.domain')
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain })

// Model
const User = require('../../models/User')

router.get('/getCustomerUpdatePaymentInfo/:customerID', async (req, res) => {
  const customerID = req.params.customerID
  let customerFromDB = await User.findById(customerID).populate(['seller', 'purchasedProductID'])
  const stripeCustomer = await stripe.customers.retrieve(customerFromDB.stripeCustomerID)
  let customer = { ...customerFromDB._doc }
  customer.last4 = null

  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(stripeCustomer.invoice_settings.default_payment_method)
    customer.last4 = paymentMethod.card.last4
  } catch (err) {
    console.log(err.message)
  }

  res.json({
    success: true,
    customer
  })
})

router.post('/updateCustomerPaymentMethod', async (req, res) => {
  const customer = await User.findById(req.body.customerID)

  try {
    // CREATE PAYMENT METHOD WITH CUSTOMER GIVEN INFO
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: req.body.number,
        exp_month: Number(req.body.expMonth),
        exp_year: Number(req.body.expYear),
        cvc: req.body.cvc
      },
      billing_details: {
        address: {
          line1: req.body.line1,
          line2: req.body.line2,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          postal_code: req.body.postalCode,
        },
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
      }
    })

    console.log(paymentMethod)

    // DELETE CURRENT DEFAULT PAYMENT METHOD (CARD) 
    const stripeCustomer = await stripe.customers.retrieve(customer.stripeCustomerID)
    await stripe.paymentMethods.detach(stripeCustomer.invoice_settings.default_payment_method)

    // DELETE CURRENT SUBSCRIPTION (WILL NOT SEND INVOICE AGAIN)
    await stripe.subscriptions.del(customer.stripeSubscription)

    // UPDATE CUSTOMER'S DEFAULT PAYMENT METHOD 
    await stripe.paymentMethods.attach(
      paymentMethod.id,
      { customer: customer.stripeCustomerID }
    )

    await stripe.customers.update(
      customer.stripeCustomerID,
      {
        address: {
          line1: req.body.line1,
          line2: req.body.line2,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          postal_code: req.body.postalCode,
        },
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        invoice_settings: {
          default_payment_method: paymentMethod.id
        }
      }
    )

    // CREATE SUBSCRIPTION
    const subscription = await stripe.subscriptions.create({
      customer: customer.stripeCustomerID,
      items: [{ price: req.body.product.stripePriceID }],
      expand: ['latest_invoice.payment_intent']
    })

    await User.findByIdAndUpdate(req.body.customerID, {
      stripeSubscription: subscription.id
    }, { new: true })

    var emailData = {
      from: 'DCGONBOARDING <info@dcgonboarding.com>',
      to: req.body.email,
      subject: 'Payment Method Update Successful! DCG',
      text: `Hi, ${req.body.name} Thank you for adding a payment method. We will shortly restore your account and notify you again. DCGONBOARDING TEAM`
    }

    mailgun.messages().send(emailData, function (error, body) {
      console.log(body)
    })

    res.json({
      success: true
    })
  } catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router