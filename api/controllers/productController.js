'use strict';

var mongoose = require('mongoose'),
  Product = mongoose.model('Product');

exports.post = function(req,res){
  var newProduct = new Product(req.body);

  newProduct.save(function(err, product) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {;
      return res.json(product);
    }
  });
};

exports.get = function(req,res){

  File.findOne({
    product_id: req.productId
  }, function(err, product) {
    if (err) {
      return res.status(500).json({ message: err });
    }

    return res.json(product);
  });
};
