'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Modelo de los productos
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  unitPrice: {
      type: Number,
      trim: true,
      required: true
  },
  stock: {
    type: Number,
    trim: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

ProductSchema.plugin('AutoIncrement', { inc_field: "product_id" });
mongoose.model('Product', ProductSchema);