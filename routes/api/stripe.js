const express = require('express')
const router = express.Router()
const config = require('config')
// Stripe Info
const secret_key = config.get('stripe.secret_key')
const stripe = require('stripe')(secret_key)
// Model
const User = require('../../models/User')
const Transaction = require('../../models/Transaction')

router.post('/webhook', async (req, res) => {
  const event = req.body

  // Handle the event
  if (event.type === 'invoice.payment_succeeded') {
    console.log('Invoice Payment Succeed')
    await payToHiddenAndPartner(event.data.object)
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send()
})

const payToHiddenAndPartner = async (invoice) => {
  const subscriptionID = invoice.subscription
  const customerID = invoice.customer
  const paidAmount = invoice.amount_paid
  const toHiddenTransferAmount = paidAmount * 0.1
  const toPartnerTransferAmouont = paidAmount * 0.5
  const subscription = await stripe.subscriptions.retrieve(subscriptionID)
  const subscriptionStartDate = subscription.current_period_start
  const subscriptionEndDate = subscription.current_period_end
  const hiddenAdmin = await User.findOne({ type: 'hidden admin' })
  const hiddenConnectedAccount = hiddenAdmin.stripeConnectedAccount
  // Customer subscription end date update
  const customer = await User.findOneAndUpdate({ stripeCustomerID: customerID }, {
    subscriptionStartDate: subscriptionStartDate,
    subscriptionEndDate: subscriptionEndDate
  }, { new: true })
  // Find partner to transfer
  const partner = await User.findById(customer.seller)
  const partnerConnectedAccount = partner.stripeConnectedAccount

  const transferSentToHidden = await stripe.transfers.create({
    amount: toHiddenTransferAmount,
    currency: 'usd',
    destination: hiddenConnectedAccount,
  })

  // HIDDEN TRANSACTION SAVE ON MONGO
  const toHiddenTransaction = new Transaction({
    ownerID: hiddenAdmin._id,
    customerID: customer._id,
    amount: toHiddenTransferAmount,
    stripeTransferID: transferSentToHidden.id
  })

  await toHiddenTransaction.save()

  if (partner.status === 'active' && partner.type !== 'admin') {
    const transferSentToPartner = await stripe.transfers.create({
      amount: toPartnerTransferAmouont,
      currency: 'usd',
      destination: partnerConnectedAccount,
    })

    const toPartnerTransaction = new Transaction({
      ownerID: partner._id,
      customerID: customer._id,
      amount: toPartnerTransferAmouont,
      stripeTransferID: transferSentToPartner.id
    })

    await toPartnerTransaction.save()
  }

  // MASTER TRANSACTION SAVE ON MONGO
  const master = await User.findOne({ type: "admin" })

  const toMasterTransaction = new Transaction({
    ownerID: master._id,
    customerID: customer._id,
    amount: paidAmount
  })

  await toMasterTransaction.save()
}

module.exports = router