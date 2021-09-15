const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

// Mailgun Info
const mailgunApiKey = config.get('mailgun.mailgunApiKey')
const mailgunDomain = config.get('mailgun.domain')
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain })

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate('purchasedProductID')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// SEND EMAIL LINK for PASSWORD RESET
router.get('/forgotPassword/:username', async (req, res) => {
  let user = await User.findOne({ username: req.params.username })

  if (user === null) {
    user = await User.findOne({ email: req.params.username })
    if (user) {

    } else {
      return res.status(400).json({ errors: [{ msg: 'There is no such user.' }] })
    }
  }

  var emailContentToPartner = {
    from: 'DCGONBOARDING <info@dcgonboarding.com>',
    to: user.email,
    subject: 'DCG Password Reset Link Send',
    text: `Hi. ${user.name}. We have received your password reset request. Check this link please. https://dcgonboarding.com/resetpassword/${user._id} If you have any problems, please contact us. Thank you. DCGONBOARDING Team.`
  }

  mailgun.messages().send(emailContentToPartner, function (error, body) {
    console.log(body)
  })

  res.json({ sent: [{ msg: 'We sent a password reset link to your email. Please check your email inbox.' }] })
})

// RESET PASSWORD
router.post('/resetPassword', async (req, res) => {
  try {
    let user = await User.findById(req.body.userID)
    if (user) {
      let filter = { _id: req.body.userID }
      let update = {
        passwordForUpdate: req.body.password,
        password: bcrypt.hashSync(req.body.password, 10),
      }
      await User.findOneAndUpdate(filter, update, { new: true })
      res.json({ sent: [{ msg: 'Password Reset Success! You can use that password from now on.' }] })
    } else {
      return res.status(400).json({ errors: [{ msg: 'Password reset Failed. There is no such user.' }] })
    }
  } catch (err) {
    console.error(err.message)
    return res.status(400).json({ errors: [{ msg: 'Password reset Failed. There is no such user.' }] })
  }
})

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username, password } = req.body

    try {
      let user = await User.findOne({ username: new RegExp(`^${req.body.username}$`, 'i')})

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
      }

      // FOR SUSPENDED CUSTOMERS (THEY CAN'T LOGIN)
      const dateInSeconds = (new Date()).getTime() / 1000
      if (user.type === 'customer' && user.subscriptionEndDate < dateInSeconds) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Your Subscription Has Already Ended.' }] })
      }

      // FOR DELETED CUSTOMERS (THEY CAN'T LOGIN)
      if (user.type === 'customer' && user.customerStatus === 'Deleted') {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Your Account Has Been Deleted.' }] })
      }

      // FOR SUSPENDED PARTNERS (THEY CAN'T LOGIN)
      if (user.type === 'partner' && user.status === 'suspended') {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Your Account Has Been Suspended.' }] })
      }

      // FOR DELETED PARTNERS (THEY CAN'T LOGIN)
      if (user.type === 'partner' && user.status === 'deleted') {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Your Account Has Been Deleted.' }] })
      }

      // FOR PENDING PARTNERS (THEY CAN'T LOGIN)
      if (user.type === 'partner' && user.status === 'inActive') {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Your Account Is Not Approved Yet.' }] })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] })
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
