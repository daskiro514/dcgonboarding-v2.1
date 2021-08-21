const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  customerID: { // FOR SUBSCRIPTION PRODUCTS ONLY
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  productID: { // FOR ONE TIME PRODUCTS ONLY
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  },
  customerName: { // FOR ONE TIME PRODUCTS ONLY
    type: String
  },
  customerPhone: { // FOR ONE TIME PRODUCTS ONLY
    type: String
  },
  customerEmail: { // FOR ONE TIME PRODUCTS ONLY
    type: String
  },
  amount: {
    type: Number
  },
  stripeTransferID: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('transaction', TransactionSchema);