'use strict';

let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Modelo de los productos en la orden
 */
let ProductArrSchema = new Schema({
  product_id: Number,
  name: String,
  quantity: Number
});

/**
 * Modelo de las ventas
 */
let SellSchema = new Schema({
  idClient: {
    type: Number,
    trim: true,
    required: true
  },
  total: {
    type: Number,
    trim: true,
    required: true
  },
  payment: {
    type: Number,
    trim: true,
    required: true
  },
  products: {
    type: [ProductArrSchema],
    trim: true,
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Sell', SellSchema);