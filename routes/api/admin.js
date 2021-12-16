const express = require('express')
const router = express.Router()
const config = require('config')

// For User Generate
const bcrypt = require('bcryptjs')
const normalize = require('normalize-url')
const gravatar = require('gravatar')

// Model
const User = require('../../models/User')
const Product = require('../../models/Product')
const Transaction = require('../../models/Transaction')
const Report = require('../../models/Report')
// For Stripe
const secret_key = config.get('stripe.secret_key')
const stripe = require('stripe')(secret_key)
const returnURL = config.get('returnURL')
// Mailgun Info
const mailgunApiKey = config.get('mailgun.mailgunApiKey')
const mailgunDomain = config.get('mailgun.domain')
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain })
// For Reports
const multer = require('multer')


// PARNTERS
router.post('/checkPartnerUsernameEmail', async (req, res) => {
  // console.log(req.body)
  let user1 = await User.findOne({ username: new RegExp(`^${req.body.username}$`, 'i') })
  let user2 = await User.findOne({ email: new RegExp(`^${req.body.email}$`, 'i') })
  let notification = ''
  let isExist = false
  if (user1) {
    notification = 'There is already a User that uses the username you entered. Please try with another one.'
    isExist = true
  }
  if (user2) {
    notification = 'There is already a User that uses the email you entered. Please try with another one.'
    isExist = true
  }
  res.json({
    success: true,
    isExist,
    notification
  })
})

router.post('/partnerRegister', async (req, res) => {
  // const accounts = await stripe.accounts.list()

  // accounts.data.forEach(async account => {
  //   if (account.email !== 'luckybuzstar@gmail.com') {
  //     let deleted = await stripe.accounts.del(account.id)
  //     console.log(deleted)
  //   }
  // })
  console.log(req.body.partnerID)
  const tempUser = await User.findOne({ _id: req.body.partnerID })

  if (tempUser) {
    console.log('AGAIN')
    const filter = { _id: req.body.partnerID }

    const update = {
      name: req.body.name,
      email: req.body.email,
      passwordForUpdate: req.body.password,
      password: req.body.password,
      username: req.body.username,
      brand: req.body.brand,
      phone: req.body.phone,
      description: req.body.description,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
    }
    const avatar = normalize(
      gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' }),
      { forceHttps: true }
    )
    update.avatar = avatar

    const pendingPartner = await User.findOneAndUpdate(filter, update, { new: true })

    const accountLink = await stripe.accountLinks.create({
      account: pendingPartner.stripeConnectedAccount,
      refresh_url: returnURL + 'failedconnectaccount/' + pendingPartner._id,
      return_url: returnURL + 'thanks/' + pendingPartner._id,
      type: 'account_onboarding',
    })

    // TO MASTER ADMIN EMAIL -> NEW PARTNER APPLIED
    const masterAdmin = await User.findOne({ type: 'admin' })

    var emailContentToAdmin = {
      from: 'DCGONBOARDING <info@dcgonboarding.com>',
      to: masterAdmin.email,
      subject: 'Pending User(Partner) Updated His/Her Information.',
      text: `Hi ${masterAdmin.name}. Applied Partner, ${pendingPartner.name} updated his/her information. 
      You can check his/her information here https://dcgonboarding.com/home/pending 
      Best Regards.
      DCGONBOARDING Team.`
    }

    mailgun.messages().send(emailContentToAdmin, function (error, body) {
      console.log(body)
    })

    res.json({
      success: true,
      connectURL: accountLink.url,
      pendingPartner
    })
  } else {
    const emailSameUser = await User.findOne({ email: req.body.email })
    if (emailSameUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: `DUPLICATE EMAIL! ${req.body.email} is already exist.` }] })
    }
    const usernameSameUser = await User.findOne({ username: req.body.username })
    if (usernameSameUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: `DUPLICATE USERNAME! ${req.body.username} is already exist.` }] })
    }
    let newPartner = new User({
      name: req.body.name,
      email: req.body.email,
      passwordForUpdate: req.body.password,
      password: req.body.password,
      type: "partner",
      username: req.body.username,
      status: "inActive",
      inActiveReason: "Partnership is not approved yet.",
      brand: req.body.brand,
      phone: req.body.phone,
      description: req.body.description,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      connectedAccountStatus: "restricted",
      mailSent: false
    })

    const account = await stripe.accounts.create({
      type: 'express',
    })

    const avatar = normalize(
      gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' }),
      { forceHttps: true }
    )

    newPartner.stripeConnectedAccount = account.id
    newPartner.avatar = avatar

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: returnURL + 'failedconnectaccount/' + newPartner._id,
      return_url: returnURL + 'thanks/' + newPartner._id,
      type: 'account_onboarding',
    })

    await newPartner.save()

    // TO MASTER ADMIN EMAIL -> NEW PARTNER APPLIED
    const masterAdmin = await User.findOne({ type: 'admin' })

    var emailContentToAdmin = {
      from: 'DCGONBOARDING <info@dcgonboarding.com>',
      to: masterAdmin.email,
      subject: 'New Partner Applied.',
      text: `Hi ${masterAdmin.name}. ${pendingPartner.name} applied as a partner of DCG. 
      You can check his/her information here https://dcgonboarding.com/home/pending 
      Best Regards.
      DCGONBOARDING Team.`
    }

    mailgun.messages().send(emailContentToAdmin, function (error, body) {
      console.log(body)
    })

    res.json({
      success: true,
      connectURL: accountLink.url,
      pendingPartner: newPartner
    })
  }
})

router.get('/updatePartnerConnectedAccount/:id', async (req, res) => {
  let pendingPartner = await User.findOneAndUpdate({ _id: req.params.id }, { mailSent: false }, { new: true })
  const accountLink = await stripe.accountLinks.create({
    account: pendingPartner.stripeConnectedAccount,
    refresh_url: returnURL + 'failedconnectaccount/' + pendingPartner._id,
    return_url: returnURL + 'thanks/' + pendingPartner._id,
    type: 'account_onboarding',
  })
  res.json({
    connectURL: accountLink.url
  })
})

router.get('/getPendingPartnerByUserId/:id', async (req, res) => {
  let pendingPartner = await User.findById(req.params.id)
  const account = await stripe.accounts.retrieve(pendingPartner.stripeConnectedAccount)
  if (account.charges_enabled && account.payouts_enabled && account.capabilities.transfers === 'active') {
    pendingPartner = await User.findOneAndUpdate({ _id: req.params.id }, { connectedAccountStatus: 'enabled', mailSent: true }, { new: true })

    // if (pendingPartner.mailSent === false) {
    var emailContentToPartner = {
      from: 'DCGONBOARDING <info@dcgonboarding.com>',
      to: pendingPartner.email,
      subject: 'Welcom to DCGONBOARDING',
      text: `Thank you ${pendingPartner.name}. Your username is ${pendingPartner.username}. Your partnership request is currently pending approval. If you have completed the connected account creation then your partnership will be approved soon. We will let you know again when you are approved. Thank you. DCGONBOARDING Team.`
    }

    mailgun.messages().send(emailContentToPartner, function (error, body) {
      console.log(body)
    })
    // }

  } else {
    if (pendingPartner.mailSent === false) {
      await User.findOneAndUpdate({ _id: req.params.id }, { mailSent: true }, { new: true })
      const accountLink = await stripe.accountLinks.create({
        account: pendingPartner.stripeConnectedAccount,
        refresh_url: returnURL + 'failedconnectaccount/' + pendingPartner._id,
        return_url: returnURL + 'thanks/' + pendingPartner._id,
        type: 'account_onboarding',
      })
      var emailContentToPartner = {
        from: 'DCGONBOARDING <info@dcgonboarding.com>',
        to: pendingPartner.email,
        subject: 'Some Issues On DCG',
        text: `Hi ${pendingPartner.name}. We detected some issues on your account connected to our stripe dashboard. You need to provide more information to Stripe to enable payments and payouts on this account. INFORMATION NEEDED - DUE NOW (Bank account or debit card). You can update here. ${accountLink.url}
        We will let you know again when your connected account is ENABLED. Thank you. DCGONBOARDING Team.`
      }

      mailgun.messages().send(emailContentToPartner, function (error, body) {
        console.log(body)
      })
    }
  }
  res.json({
    success: true,
    partner: pendingPartner
  })
})

router.get('/getPendingPartners', async (req, res) => {
  const customer = await stripe.customers.retrieve('cus_KmkLsHE79B85LS')
  let subscription = {}

  const subscriptions = await stripe.subscriptions.list({ limit: 100 })

  subscriptions.data.forEach(innerSubscription => {
    let customerProperty = innerSubscription.customer
    if (customerProperty === customer.id) {
      console.log(innerSubscription)
      subscription = innerSubscription
    }
  })

  console.log(subscription)

  // const seller = await User.findOne({ username: 'wilw77' })
  // const product = await Product.findOne({ price: 49700 })

  // const newUser = new User({
  //   type: "customer",
  //   name: customer.name,
  //   email: customer.email,
  //   phone: customer.phone,
  //   username: customer.email,
  //   passwordForUpdate: customer.email,
  //   password: bcrypt.hashSync(customer.email, 10),
  //   seller: seller._id,
  //   stripeCustomerID: customer.id,
  //   stripeSubscription: subscription.id,
  //   purchasedProductID: product._id,
  //   customerStatus: 'Active',
  //   date: new Date(subscription.created * 1000),
  //   avatar: normalize(
  //     gravatar.url(customer.email, { s: '200', r: 'pg', d: 'mm' }),
  //     { forceHttps: true }
  //   ),
  //   subscriptionStartDate: subscription.current_period_start,
  //   subscriptionEndDate: subscription.current_period_end
  // })

  // console.log(newUser)

  // console.log('FINISHED')

  let pendingPartners = await User.find({ status: 'inActive' })
  res.json(pendingPartners)
})

router.delete('/deletePendingPartner/:id', async (req, res) => {
  let partnerIsDeleted = false
  const partnerForDelete = await User.findById(req.params.id)
  const deleted = await stripe.accounts.del(partnerForDelete.stripeConnectedAccount)
  if (deleted.deleted) {
    var emailContentToPartner = {
      from: 'DCGONBOARDING <info@dcgonboarding.com>',
      to: partnerForDelete.email,
      subject: 'Your Account Is Deleted.',
      text: `Hi ${partnerForDelete.name}. Your account on DCG has been deleted. If you have any questions, contact HERE. DCGONBOARDING Team.`
    }

    mailgun.messages().send(emailContentToPartner, function (error, body) {
      console.log(body)
    })

    await User.remove({ _id: req.params.id })
    partnerIsDeleted = true
  }
  res.json({ partnerIsDeleted })
})

router.post('/approvePartner', async (req, res) => {
  const approvedPartner = await User.findOneAndUpdate({ _id: req.body._id }, {
    status: 'active',
    inActiveReason: '',
    passwordForUpdate: req.body.password,
    password: bcrypt.hashSync(req.body.password, 10),
  }, { new: true })

  var emailContentToPartner = {
    from: 'DCGONBOARDING <info@dcgonboarding.com>',
    to: approvedPartner.email,
    subject: 'Your Partnership Request Is Approved.',
    text: `Congratulations ${approvedPartner.name}! Your Partnership Request to DCG has been approved. We send you the login credential. Your USERNAME is ${approvedPartner.username} and PASSWORD is ${approvedPartner.passwordForUpdate}. DCGONBOARDING Team.`
  }

  mailgun.messages().send(emailContentToPartner, function (error, body) {
    console.log(body)
  })

  res.json({ partnerIsApproved: true })
})

router.get('/updateConnectedAccount/:id', async (req, res) => {
  const partnerForUpdate = await User.findOneAndUpdate({ _id: req.params.id }, { mailSent: false }, { new: true })

  const accountLink = await stripe.accountLinks.create({
    account: partnerForUpdate.stripeConnectedAccount,
    refresh_url: returnURL + 'failedconnectaccount/' + partnerForUpdate._id,
    return_url: returnURL + 'thanks/' + partnerForUpdate._id,
    type: 'account_onboarding',
  })

  var emailContentToPartner = {
    from: 'DCGONBOARDING <info@dcgonboarding.com>',
    to: partnerForUpdate.email,
    subject: 'DCGONBOARDING TEAM: Update Link Send',
    text: `Hi ${partnerForUpdate.name}. You need to provide more information to be approved as a PARTNER of DCG. We send you the update link. ${accountLink.url} We will let you know again when you have completed the updates. DCGONBOARDING Team.`
  }

  mailgun.messages().send(emailContentToPartner, function (error, body) {
    console.log(body)
  })

  res.json({ updateLinkSent: true })
})

router.get('/getPartners', async (req, res) => {
  // const account = await stripe.accounts.retrieve(
  //   'acct_1J22aYPToS6alfPi'
  // )
  // console.log(account)


  const suspendedPartners = await User.find({ status: 'suspended' })
  const activePartners = await User.find({ status: 'active' })
  let partners = new Array
  suspendedPartners.forEach(element => partners.push(element))
  activePartners.forEach(element => partners.push(element))
  res.json({
    success: true,
    partners
  })
})

router.get('/suspendPartner/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const update = { status: 'suspended', inActiveReason: 'Suspended by ADMIN' }
  await User.findOneAndUpdate(filter, update)

  res.json({
    success: true
  })
})

router.get('/unsuspendPartner/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const update = { status: 'active', inActiveReason: '' }
  await User.findOneAndUpdate(filter, update)

  res.json({
    success: true
  })
})

router.delete('/deletePartner/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const update = { status: 'deleted', inActiveReason: '' }
  const partner = await User.findOneAndUpdate(filter, update, { new: true })

  const masterAdminID = (await User.findOne({ type: 'admin' }))._id

  const customers = await User.find({ seller: req.params.id })
  for (let i = 0; i < customers.length; i++) {
    let customerID = customers[i]._id
    await User.findOneAndUpdate({ _id: customerID }, { seller: masterAdminID }, { new: true })
  }

  var emailContentToPartner = {
    from: 'DCGONBOARDING <info@dcgonboarding.com>',
    to: partner.email,
    subject: 'Your Account Is Deleted.',
    text: `Hi ${partner.name}. Your account on DCG has been deleted. If you have any questions, contact HERE. DCGONBOARDING Team.`
  }

  mailgun.messages().send(emailContentToPartner, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true
  })
})

router.post('/resetPassword', async (req, res) => {
  let filter = { _id: req.body.userID }
  let update = {
    passwordForUpdate: req.body.password,
    password: bcrypt.hashSync(req.body.password, 10),
  }
  await User.findOneAndUpdate(filter, update, { new: true })
  res.json({
    success: true
  })
})

// PRODUCTS
router.get('/getProducts', async (req, res) => {
  const products = await Product.find().populate('owner')

  res.json({
    success: true,
    products: products
  })
})

router.get('/approveProduct/:id', async (req, res) => {
  await Product.findOneAndUpdate({ _id: req.params.id }, { status: 'Approved' }, { new: true })
  res.json({
    success: true,
  })
})

router.post('/updateProduct', async (req, res) => {
  const product = await Product.findById(req.body.productID).populate('owner')

  await stripe.products.update(
    product.stripeProductID,
    {
      name: req.body.name,
      description: req.body.description,
      metadata: {
        owner: String(product.owner._id)
      }
    }
  )

  let price = {}

  if (req.body.recurringInterval) {
    price = await stripe.prices.create({
      unit_amount: req.body.price * 100,
      currency: 'usd',
      recurring: { interval: req.body.recurringInterval },
      product: product.stripeProductID,
    })
  } else {
    price = await stripe.prices.create({
      unit_amount: req.body.price * 100,
      currency: 'usd',
      product: product.stripeProductID,
    })
  }

  await Product.findOneAndUpdate({ _id: req.body.productID }, {
    name: req.body.name,
    price: req.body.price * 100,
    description: req.body.description,
    recurringInterval: req.body.recurringInterval,
    stripePriceID: price.id
  }, { new: true })

  var emailContentToPartner = {
    from: 'DCGONBOARDING <info@dcgonboarding.com>',
    to: product.owner.email,
    subject: 'Your Product was Updated by Master Admin',
    text: `Your product ${product.name} has been updated by Master Admin. Thank you. DCGONBOARDING Team.`
  }

  mailgun.messages().send(emailContentToPartner, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true
  })
})

router.get('/suspendProduct/:id', async (req, res) => {
  await Product.findOneAndUpdate({ _id: req.params.id }, { status: 'Not Approved' }, { new: true })
  res.json({
    success: true,
  })
})

// CUSTOMERS
router.get('/getAllCustomers', async (req, res) => {
  // const subscriptions = await stripe.subscriptions.list({
  //   limit: 100,
  // })
  const customers1 = await User.find({ type: 'customer' })
  customers1.forEach((customer, index) => {
    if (customer.customerStatus !== 'Active') {
      console.log('No. ', index + 1)
      console.log('Name. ', customer.name)
      console.log('Status. ', customer.customerStatus)
      console.log('Stripe Customer ID. ', customer.stripeCustomerID)
      console.log('Stripe Subscription ID. ', customer.stripeSubscription)
      console.log('\n\n')
    }
  })


  const customersFromDB = await User.find({ type: 'customer' }).populate('purchasedProductID').populate('seller')
  const customers = customersFromDB.filter(customer => customer.customerStatus !== 'Deleted')
  res.json({
    success: true,
    customers
  })
})

router.post('/suspendCustomer', async (req, res) => {
  const filter = { _id: req.body.customer._id }
  let update = { customerStatus: 'Suspended' }
  const option = req.body.option
  const endDate = ((new Date()).getTime() / 1000).toFixed(0)
  const customer = req.body.customer

  if (option === 'immediately') {
    // DELETE ON STRIPE
    await stripe.subscriptions.del(customer.stripeSubscription)
    // UPDATE MONGO DB
    update.stripeSubscription = undefined
    update.subscriptionEndDate = endDate
    await User.findOneAndUpdate(filter, update)
  } else if (option === 'atEnd') {
    // UPDATE ON STRIPE
    await stripe.subscriptions.update(customer.stripeSubscription, {
      cancel_at_period_end: true
    })
    // UPDATE MONGO DB
    await User.findOneAndUpdate(filter, update)
  } else if (option === 'setDate') {
    // UPDATE ON STRIPE
    await stripe.subscriptions.update(customer.stripeSubscription, {
      cancel_at: ((new Date(req.body.endDate)).getTime() / 1000).toFixed(0)
    })
    // UPDATE MONGO DB
    await User.findOneAndUpdate(filter, update)
  }

  res.json({
    success: true
  })
})

router.get('/restoreCustomer/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  let update = { customerStatus: 'Active' }

  const customer = await User.findById(req.params.id).populate('purchasedProductID')
  if (customer.stripeSubscription === null) { // FOR IMMEDIATELY SUSPENDED CUSTOMERS -> CREATE SUBSCRPTION AGAIN
    const subscription = await stripe.subscriptions.create({
      customer: customer.stripeCustomerID,
      items: [{ price: customer.purchasedProductID.stripePriceID }],
      expand: ['latest_invoice.payment_intent']
    })

    update.stripeSubscription = subscription.id
    update.subscriptionStartDate = subscription.current_period_start
    update.subscriptionEndDate = subscription.current_period_end

    await User.findOneAndUpdate(filter, update)
  } else {
    await stripe.subscriptions.update(customer.stripeSubscription, {
      cancel_at_period_end: false,
    })
    await stripe.subscriptions.update(customer.stripeSubscription, {
      cancel_at: null
    })
    await User.findOneAndUpdate(filter, update)
  }

  res.json({
    success: true
  })
})

router.delete('/deleteCustomer/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const update = { customerStatus: 'Deleted' }
  const customer = await User.findById(req.params.id)
  await stripe.subscriptions.del(customer.stripeSubscription)
  await stripe.customers.del(customer.stripeCustomerID)
  await User.findOneAndUpdate(filter, update)

  res.json({
    success: true
  })
})

router.get('/getCustomerTransactions/:id', async (req, res) => {
  const partnerAdmin = await User.findOne({ type: 'hidden admin' })
  const transactionsFromDB = await Transaction.find({ customerID: req.params.id, ownerID: partnerAdmin._id })

  let transactions = []
  transactionsFromDB.forEach(element => {
    let transaction = {
      amount: element.amount * 10,
      date: element.date
    }
    transactions.push(transaction)
  })

  res.json({
    success: true,
    transactions
  })
})

// TRANSACTIONS
router.get('/getAdminTransactions/:id', async (req, res) => {
  let tempTransactions = await Transaction.find({ ownerID: req.params.id }).populate('customerID').populate('productID')

  let transactions = []

  for (let i = 0; i < tempTransactions.length; i++) {
    let transaction = tempTransactions[i]
    if (transaction.customerID) { // FOR SUBSCRIPTION TRANSACTIONS
      let product = await Product.findById(transaction.customerID.purchasedProductID)
      let transactionForSend = {
        _id: transaction._id,
        ownerID: transaction.ownerID,
        customerID: transaction.customerID,
        amount: transaction.amount,
        date: transaction.date,
        stripeTransferID: transaction.stripeTransferID,
        product: product.name
      }
      transactions.push(transactionForSend)
    } else { // FOR ONE TIME TRANSACTIONS
      transactions.push(transaction)
    }
  }

  res.json({
    success: true,
    transactions
  })
})

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files')
    },
    filename(req, file, cb) {
      // cb(null, `${new Date().getTime()}_${file.originalname}`)
      cb(null, `${file.originalname}`)
    }
  }),
  limits: {
    fileSize: 100000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|JPG|PNG|png|pdf|PDF|doc|docx|xlsx|xls)$/)) {
      return cb(new Error('only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'))
    }
    cb(undefined, true) // continue with upload
  }
})

// REPORTS
router.post('/addNewReport', upload.fields([{ name: 'thumbimage', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
  let thumbimage = req.files["thumbimage"][0].filename
  let pdf = req.files["pdf"] ? req.files["pdf"][0].filename : undefined
  let content = req.body.content ? req.body.content : undefined
  let newReport = new Report({
    title: req.body.title,
    type: req.body.type,
    content: content,
    thumbimage: thumbimage,
    pdf: pdf
  })
  await newReport.save()
  res.json({
    success: true,
  })
})

router.get('/getReports', async (req, res) => {
  const reports = await Report.find()
  res.json({
    success: true,
    reports
  })
})

router.get('/getReportByID/:id', async (req, res) => {
  const report = await Report.findById(req.params.id)
  res.json({
    success: true,
    report
  })
})

router.post('/updateReport', upload.fields([{ name: 'thumbimage', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
  let filter = { _id: req.body.updateID }
  let thumbimage = req.files["thumbimage"] ? req.files["thumbimage"][0].filename : undefined
  let pdf = req.files["pdf"] ? req.files["pdf"][0].filename : undefined
  let content = req.body.content ? req.body.content : undefined
  let update = {
    title: req.body.title,
    type: req.body.type,
  }
  if (thumbimage) update.thumbimage = thumbimage
  if (pdf) update.pdf = pdf
  if (content) update.content = content
  await Report.findOneAndUpdate(filter, update)

  res.json({
    success: true
  })
})

router.delete('/deleteReport/:id', async (req, res) => {
  await Report.remove({ _id: req.params.id })
  res.json({
    success: true
  })
})

module.exports = router
