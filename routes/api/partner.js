const express = require('express')
const router = express.Router()
const config = require('config')

// For User Generate
const bcrypt = require('bcryptjs')
const normalize = require('normalize-url')
const gravatar = require('gravatar')

// Stripe Info
const secret_key = config.get('stripe.secret_key')
const publishable_key = config.get('stripe.publishable_key')
const stripe = require('stripe')(secret_key)
// Mailgun Info
const mailgunApiKey = config.get('mailgun.mailgunApiKey')
const mailgunDomain = config.get('mailgun.domain')
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain })
// Model
const Product = require('../../models/Product')
const User = require('../../models/User')
const Transaction = require('../../models/Transaction')
const Course = require('../../models/Course')
// For File Upload
const multer = require('multer')

router.post('/addOneTimeProductToStripe', async (req, res) => {
  const product = await stripe.products.create({
    name: req.body.name,
    description: req.body.description,
    metadata: {
      owner: req.body.productOwner
    }
  })

  const price = await stripe.prices.create({
    unit_amount: req.body.price * 100,
    currency: 'usd',
    product: product.id,
  })

  let newProduct = new Product({
    name: req.body.name,
    price: req.body.price * 100,
    description: req.body.description,
    type: 'One Time Product',
    owner: req.body.productOwner,
    stripeProductID: product.id,
    stripePriceID: price.id,
  })

  await newProduct.save()

  // TO MASTER ADMIN EMAIL -> NEW PARTNER APPLIED
  const masterAdmin = await User.findOne({ type: 'admin' })
  const partner = await User.findById(req.body.productOwner)

  var emailContentToAdmin = {
    from: 'DCGONBOARDING <info@dcgonboarding.com>',
    to: masterAdmin.email,
    subject: 'New Product Added.',
    text: `Hi ${masterAdmin.name}. A Partner(${partner.name}) added a new product(${newProduct.name}) on his product list. 
    You can check that product here https://dcgonboarding.com/home/products 
    Best Regards.
    DCGONBOARDING Team.`
  }

  mailgun.messages().send(emailContentToAdmin, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true
  })
})

router.post('/updateOneTimeProduct', async (req, res) => {
  const product = await Product.findById(req.body.productID)

  await stripe.products.update(
    product.stripeProductID,
    {
      name: req.body.name,
      description: req.body.description,
      metadata: {
        owner: String(product.owner)
      }
    }
  )

  const price = await stripe.prices.create({
    unit_amount: req.body.price * 100,
    currency: 'usd',
    product: product.stripeProductID
  })

  await Product.findOneAndUpdate({ _id: req.body.productID }, {
    name: req.body.name,
    price: req.body.price * 100,
    description: req.body.description,
    stripePriceID: price.id,
    status: 'Not Approved'
  }, { new: true })

  // TO MASTER ADMIN EMAIL -> A PRODUCT UPDATED
  const masterAdmin = await User.findOne({ type: 'admin' })
  const partner = await User.findById(product.owner)

  var emailContentToAdmin = {
    from: 'DCGONBOARDING <info@dcgonboarding.com>',
    to: masterAdmin.email,
    subject: 'Product Updated.',
    text: `Hi ${masterAdmin.name}. A Partner(${partner.name}) updated his/her product(${product.name}) on his product list. 
    You can check that product here https://dcgonboarding.com/home/products 
    Best Regards.
    DCGONBOARDING Team.`
  }

  mailgun.messages().send(emailContentToAdmin, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true
  })
})

router.post('/addSubscriptionProductToStripe', async (req, res) => {
  const product = await stripe.products.create({
    name: req.body.name,
    description: req.body.description,
    metadata: {
      owner: req.body.productOwner
    }
  })

  const price = await stripe.prices.create({
    unit_amount: req.body.price * 100,
    currency: 'usd',
    recurring: { interval: req.body.recurringInterval },
    product: product.id,
  })

  let newProduct = new Product({
    name: req.body.name,
    price: req.body.price * 100,
    description: req.body.description,
    type: 'Subscription Product',
    recurringInterval: req.body.recurringInterval,
    owner: req.body.productOwner,
    stripeProductID: product.id,
    stripePriceID: price.id,
  })

  await newProduct.save()

  // TO MASTER ADMIN EMAIL -> NEW PRODUCT ADDED
  const masterAdmin = await User.findOne({ type: 'admin' })
  const partner = await User.findById(req.body.productOwner)

  var emailContentToAdmin = {
    from: 'DCGONBOARDING <info@dcgonboarding.com>',
    to: masterAdmin.email,
    subject: 'New Product Added.',
    text: `Hi ${masterAdmin.name}. A Partner(${partner.name}) added a new product(${newProduct.name}) on his product list. 
    You can check that product here https://dcgonboarding.com/home/products 
    Best Regards.
    DCGONBOARDING Team.`
  }

  mailgun.messages().send(emailContentToAdmin, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true
  })
})

router.post('/updateSubscriptionProduct', async (req, res) => {
  const product = await Product.findById(req.body.productID)

  await stripe.products.update(
    product.stripeProductID,
    {
      name: req.body.name,
      description: req.body.description,
      metadata: {
        owner: String(product.owner)
      }
    }
  )

  const price = await stripe.prices.create({
    unit_amount: req.body.price * 100,
    currency: 'usd',
    recurring: { interval: req.body.recurringInterval },
    product: product.stripeProductID
  })

  await Product.findOneAndUpdate({ _id: req.body.productID }, {
    name: req.body.name,
    price: req.body.price * 100,
    description: req.body.description,
    recurringInterval: req.body.recurringInterval,
    stripePriceID: price.id,
    status: 'Not Approved'
  }, { new: true })

  // TO MASTER ADMIN EMAIL -> A PRODUCT UPDATED
  const masterAdmin = await User.findOne({ type: 'admin' })
  const partner = await User.findById(product.owner)

  var emailContentToAdmin = {
    from: 'DCGONBOARDING <info@dcgonboarding.com>',
    to: masterAdmin.email,
    subject: 'Product Updated.',
    text: `Hi ${masterAdmin.name}. A Partner(${partner.name}) updated his/her product(${product.name}) on his product list. 
    You can check that product here https://dcgonboarding.com/home/products 
    Best Regards.
    DCGONBOARDING Team.`
  }

  mailgun.messages().send(emailContentToAdmin, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true
  })
})

router.get('/getProducts/:id', async (req, res) => {
  let masterAdmin = await User.findOne({ type: 'admin' })
  let defaultProducts = await Product.find({ owner: masterAdmin._id })
  let oneTimeProducts = await Product.find({
    $and: [
      { owner: req.params.id },
      { type: 'One Time Product' },
    ]
  })
  let subscriptionProducts = await Product.find({
    $and: [
      { owner: req.params.id },
      { type: 'Subscription Product' },
    ]
  })

  res.json({
    success: true,
    oneTimeProducts: oneTimeProducts,
    subscriptionProducts: subscriptionProducts,
    defaultProducts: defaultProducts
  })
})

router.get('/getTempUser/:id', async (req, res) => {
  let user = await User.findById(req.params.id).select('-password')

  res.json({
    success: true,
    user
  })
})

router.get('/getSalesProducts/:id', async (req, res) => {
  let masterAdmin = await User.findOne({ type: 'admin' })
  let defaultProducts = await Product.find({ owner: masterAdmin._id })
  let oneTimeProducts = await Product.find({
    $and: [
      { owner: req.params.id },
      { type: 'One Time Product' },
      { status: 'Approved' }
    ]
  })
  let subscriptionProducts = await Product.find({
    $and: [
      { owner: req.params.id },
      { type: 'Subscription Product' },
      { status: 'Approved' }
    ]
  })

  res.json({
    success: true,
    oneTimeProducts: oneTimeProducts,
    subscriptionProducts: subscriptionProducts,
    defaultProducts: defaultProducts
  })
})

router.get('/getProductByID/:id', async (req, res) => {
  let product = await Product.findById(req.params.id).populate('owner')
  res.json({
    success: true,
    product: product
  })
})

router.get('/getPublishableKey', async (req, res) => {
  res.json({
    success: true,
    publishableKey: publishable_key
  })
})

router.post('/createCustomer', async (req, res) => {
  const customer = await stripe.customers.create({
    payment_method: req.body.paymentMethodID,
    email: req.body.email,
    invoice_settings: {
      default_payment_method: req.body.paymentMethodID
    }
  })
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: req.body.productForSale.stripePriceID }],
    expand: ['latest_invoice.payment_intent']
  })
  const newUser = new User({
    type: "customer",
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    username: req.body.username,
    passwordForUpdate: req.body.password,
    password: bcrypt.hashSync(req.body.password, 10),
    seller: req.body.sellerID,
    stripeCustomerID: customer.id,
    stripeSubscription: subscription.id,
    purchasedProductID: req.body.productForSale._id,
    customerStatus: 'Active'
  })
  const avatar = normalize(
    gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' }),
    { forceHttps: true }
  )
  newUser.avatar = avatar
  await newUser.save()
  var emailData = {}
  if (req.body.productForSale.type === 'Subscription Product') {
    emailData = {
      from: 'DCGONBOARDING <info@dcgonboarding.com>',
      to: req.body.email,
      subject: 'Welcom to DCGONBOARDING',
      text: 'Your request have successfully approved. Your username is <' + req.body.username + '> and password is <' + req.body.password + '>. Thanks. DCGONBOARDING TEAM'
    }
  } else {
    emailData = {
      from: 'DCGONBOARDING <info@dcgonboarding.com>',
      to: req.body.email,
      subject: 'Welcom to DCGONBOARDING',
      text: 'Your request have successfully approved. Thanks. DCGONBOARDING TEAM'
    }
  }
  mailgun.messages().send(emailData, function (error, body) {
    console.log(body)
  })

  // await payToHiddenAndPartner(subscription.id, customer.id, 19900)

  res.json({
    success: true,
    customer: newUser,
    customerProduct: req.body.productForSale
  })
})

router.post('/customerResubscribe', async (req, res) => {
  let customer = await User.findById(req.body.customerID)

  await stripe.subscriptions.del(customer.stripeSubscription)

  const subscription = await stripe.subscriptions.create({
    customer: customer.stripeCustomerID,
    items: [{ price: req.body.productForSale.stripePriceID }],
    expand: ['latest_invoice.payment_intent']
  })

  customer = await User.findByIdAndUpdate(req.body.customerID, { stripeSubscription: subscription.id }, { new: true })

  var emailData = {
    from: 'DCGONBOARDING <info@dcgonboarding.com>',
    to: customer.email,
    subject: 'Welcom to DCGONBOARDING',
    text: 'Your request have successfully approved. Your username is <' + customer.username + '> and password is <' + customer.passwordForUpdate + '>. Thanks. DCGONBOARDING TEAM'
  }

  mailgun.messages().send(emailData, function (error, body) {
    console.log(body)
  })

  res.json({
    success: true,
    customer,
    customerProduct: req.body.productForSale
  })
})

const payToHiddenAndPartner = async (subscriptionID, customerID, paidAmount) => {
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

  const transferSentToPartner = await stripe.transfers.create({
    amount: toPartnerTransferAmouont,
    currency: 'usd',
    destination: partnerConnectedAccount,
  })

  const toHiddenTransaction = new Transaction({
    ownerID: hiddenAdmin._id,
    customerID: customer._id,
    amount: toHiddenTransferAmount,
    stripeTransferID: transferSentToHidden.id
  })

  await toHiddenTransaction.save()

  const toPartnerTransaction = new Transaction({
    ownerID: partner._id,
    customerID: customer._id,
    amount: toPartnerTransferAmouont,
    stripeTransferID: transferSentToPartner.id
  })

  await toPartnerTransaction.save()

  const master = await User.findOne({ type: "admin" })

  const toMasterTransaction = new Transaction({
    ownerID: master._id,
    customerID: customer._id,
    amount: paidAmount
  })

  await toMasterTransaction.save()
}

router.get('/getPartnerTransactions/:id', async (req, res) => {
  let tempTransactions = await Transaction.find({ ownerID: req.params.id }).populate('customerID').populate('productID').populate('ownerID')

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

  // FOR DEFAULT SUBSCRIPTION UPDATE
  // let product1 = await Product.findOneAndUpdate({name: 'Master Mind Package'}, {
  //   description: ''
  // }, {new: true})

  // await stripe.products.update(
  //   product1.stripeProductID,
  //   {description: ''}
  // )

  // let product2 = await Product.findOneAndUpdate({name: 'Reports Only'}, {
  //   description: ''
  // }, {new: true})

  // await stripe.products.update(
  //   product2.stripeProductID,
  //   {description: ''}
  // )
  // // -------------------------------
})

router.get('/getPartnerCustomers/:id', async (req, res) => {
  const customers = await User.find({ seller: req.params.id }).populate('purchasedProductID')
  res.json({
    success: true,
    customers
  })
})

router.get('/getPaymentIntent/:price', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(req.params.price),
    currency: 'usd',
    payment_method_types: ['card'],
  })
  res.json({
    success: true,
    paymentIntent
  })
})

router.post('/addTransactionForOneTimeProductSale', async (req, res) => {
  const hiddenAdmin = await User.findOne({ type: 'hidden admin' })
  const toHiddenTransferAmount = req.body.productForSale.price * 0.1
  const hiddenConnectedAccount = hiddenAdmin.stripeConnectedAccount
  const transferSentToHidden = await stripe.transfers.create({
    amount: toHiddenTransferAmount,
    currency: 'usd',
    destination: hiddenConnectedAccount,
  })

  const toHiddenTransaction = new Transaction({
    ownerID: hiddenAdmin._id,
    productID: req.body.productForSale._id,
    customerName: req.body.billingDetails.name,
    customerEmail: req.body.billingDetails.email,
    customerPhone: req.body.billingDetails.phone,
    amount: toHiddenTransferAmount,
    stripeTransferID: transferSentToHidden.id
  })

  await toHiddenTransaction.save()

  const partner = await User.findById(req.body.ownerID)
  const toPartnerTransferAmouont = req.body.productForSale.price * 0.5
  const partnerConnectedAccount = partner.stripeConnectedAccount
  const transferSentToPartner = await stripe.transfers.create({
    amount: toPartnerTransferAmouont,
    currency: 'usd',
    destination: partnerConnectedAccount,
  })

  const toPartnerTransaction = new Transaction({
    ownerID: partner._id,
    productID: req.body.productForSale._id,
    customerName: req.body.billingDetails.name,
    customerEmail: req.body.billingDetails.email,
    customerPhone: req.body.billingDetails.phone,
    amount: toPartnerTransferAmouont,
    stripeTransferID: transferSentToPartner.id
  })

  await toPartnerTransaction.save()

  const masterAdmin = await User.findOne({ type: 'admin' })

  const toMasterTransaction = new Transaction({
    ownerID: masterAdmin._id,
    productID: req.body.productForSale._id,
    customerName: req.body.billingDetails.name,
    customerEmail: req.body.billingDetails.email,
    customerPhone: req.body.billingDetails.phone,
    amount: req.body.productForSale.price
  })

  await toMasterTransaction.save()

  res.json({
    success: true,
    customer: req.body.billingDetails,
    customerProduct: req.body.productForSale
  })
})

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files')
    },
    filename(req, file, cb) {
      cb(null, `${file.originalname.replace(" ", "")}`)
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

router.post('/addNewCourse', upload.fields([{ name: 'thumbImage', maxCount: 1 }]), async (req, res) => {
  let thumbImage = req.files["thumbImage"][0].filename
  let newCourse = new Course({
    title: req.body.title,
    videoID: req.body.videoID,
    description: req.body.description,
    thumbImage: thumbImage,
    partner: req.body.partner,
  })
  await newCourse.save()

  res.json({
    success: true
  })
})

router.get('/getCourses/:id', async (req, res) => {
  const courses = await Course.find({ partner: req.params.id })

  res.json({
    success: true,
    courses
  })
})

router.post('/updateCourse', upload.fields([{ name: 'thumbImage', maxCount: 1 }]), async (req, res) => {
  let filter = { _id: req.body.updateID }
  let thumbImage = req.files["thumbImage"] ? req.files["thumbImage"][0].filename : undefined
  let update = {
    title: req.body.title,
    description: req.body.description,
    videoID: req.body.videoID
  }
  if (thumbImage) update.thumbImage = thumbImage

  await Course.findOneAndUpdate(filter, update)

  res.json({
    success: true
  })
})

router.delete('/deleteCourse/:id', async (req, res) => {
  await Course.remove({ _id: req.params.id })

  res.json({
    success: true
  })
})

router.get('/getCourseByID/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)

  res.json({
    success: true,
    course
  })
})

router.post('/updateSalesPage', upload.fields([{ name: 'salesPageLogoImage', maxCount: 1 }, { name: 'salesPageBackgroundImage', maxCount: 1 }]), async (req, res) => {
  const filter = { _id: req.body.partnerID }
  const salesPageLogoImage = req.files["salesPageLogoImage"] ? req.files["salesPageLogoImage"][0].filename : undefined
  const salesPageTitle = req.body.salesPageTitle
  const salesPageSubtitle = req.body.salesPageSubtitle
  const salesPageDescription = req.body.salesPageDescription
  const salesPageBackgroundColor = req.body.salesPageBackgroundColor
  const salesPageFontColor = req.body.salesPageFontColor
  const salesPageBoxColor = req.body.salesPageBoxColor
  const salesPageBackgroundImage = req.files["salesPageBackgroundImage"] ? req.files["salesPageBackgroundImage"][0].filename : undefined

  let update = {
    salesPageTitle,
    salesPageSubtitle,
    salesPageDescription,
    salesPageBackgroundColor,
    salesPageFontColor,
    salesPageBoxColor
  }

  if (salesPageLogoImage) update.salesPageLogoImage = salesPageLogoImage
  if (salesPageBackgroundImage) update.salesPageBackgroundImage = salesPageBackgroundImage

  await User.findOneAndUpdate(filter, update)

  res.json({
    success: true,
  })
})

router.get('/defaultSalesPage/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  let update = {
    salesPageTitle: null,
    salesPageLogoImage: null,
    salesPageDescription: null,
    salesPageBackgroundColor: null,
    salesPageFontColor: null,
    salesPageBoxColor: null,
    salesPageBackgroundImage: null
  }
  await User.findOneAndUpdate(filter, update)

  res.json({
    success: true,
  })
})

router.post('/updateCoursePage', upload.fields([{ name: 'coursePageLogoImage', maxCount: 1 }, { name: 'coursePageBackgroundImage', maxCount: 1 }]), async (req, res) => {
  const filter = { _id: req.body.partnerID }
  const coursePageLogoImage = req.files["coursePageLogoImage"] ? req.files["coursePageLogoImage"][0].filename : undefined
  const coursePageDescription = req.body.coursePageDescription
  const coursePageBackgroundColor = req.body.coursePageBackgroundColor
  const coursePageFontColor = req.body.coursePageFontColor
  const coursePageBackgroundImage = req.files["coursePageBackgroundImage"] ? req.files["coursePageBackgroundImage"][0].filename : undefined

  let update = {
    coursePageDescription,
    coursePageBackgroundColor,
    coursePageFontColor
  }

  if (coursePageLogoImage) update.coursePageLogoImage = coursePageLogoImage
  if (coursePageBackgroundImage) update.coursePageBackgroundImage = coursePageBackgroundImage

  await User.findOneAndUpdate(filter, update)

  res.json({
    success: true,
  })
})

router.get('/defaultCoursePage/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  let update = {
    coursePageLogoImage: null,
    coursePageDescription: null,
    coursePageBackgroundColor: null,
    coursePageFontColor: null,
    coursePageBackgroundImage: null
  }
  await User.findOneAndUpdate(filter, update)

  res.json({
    success: true,
  })
})

module.exports = router