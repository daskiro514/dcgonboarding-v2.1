const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  recurringInterval: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  stripeProductID: {
    type: String,
    required: true
  },
  stripePriceID: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Not Approved'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('product', ProductSchema);