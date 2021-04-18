'use strict';

let mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);
/**
 * Modelo de los productos
 */
let ProductSchema = new Schema({
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

ProductSchema.plugin(autoIncrement.plugin, { model: 'Product', field: 'product_id' });
mongoose.model('Product', ProductSchema);