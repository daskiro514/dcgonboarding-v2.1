const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
  },
  // DCG UPDATE
  username: {
    type: String,
    required: true,
    unique: true
  },
  // PARTNER APPLICATION
  status: {
    type: String
  },
  inActiveReason: {
    type: String
  },
  passwordForUpdate: {
    type: String
  },
  brand: {
    type: String,
  },
  phone: {
    type: String,
  },
  description: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  stripeConnectedAccount: {
    type: String
  },
  connectedAccountStatus: {
    type: String
  },
  mailSent: {
    type: Boolean
  },
  // CUSTOMER
  stripeCustomerID: {
    type: String
  },
  customerStatus: {
    type: String
  },
  stripeSubscription: {
    type: String
  },
  purchasedProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  },
  subscriptionStartDate: {
    type: Number
  },
  subscriptionEndDate: {
    type: Number
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  // PARTNER SALES PAGE CUSTOMIZE
  salesPageLogoImage: {
    type: String
  },
  salesPageTitle: {
    type: String
  },
  salesPageSubtitle: {
    type: String
  },
  salesPageDescription: {
    type: String
  },
  salesPageBackgroundColor: {
    type: String
  },
  salesPageFontColor: {
    type: String
  },
  salesPageBoxColor: {
    type: String
  },
  salesPageBackgroundImage: {
    type: String
  },
  // PARTNER COURSE PAGE CUSTOMIZE
  coursePageLogoImage: {
    type: String
  },
  coursePageDescription: {
    type: String
  },
  coursePageBackgroundColor: {
    type: String
  },
  coursePageFontColor: {
    type: String
  },
  coursePageBackgroundImage: {
    type: String
  }
});

module.exports = mongoose.model('user', UserSchema);
