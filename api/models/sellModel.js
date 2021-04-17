'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Modelo de las ventas
 */
var SellSchema = new Schema({
  idClient: {
    type: Number,
    trim: true,
    required: true
  },
  idProduct: {
    type: Number,
    trim: true,
    required: true
  },
  total: {
    type: String,
    trim: true
  },
  fileText: {
    type: Schema.Types.Mixed,
    trim: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Sell', SellSchema);