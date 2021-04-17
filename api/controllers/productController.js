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

exports.get = function(res){

  Product.find({}, function(err, products) {
    if (err) {
      return res.status(500).json({ message: err });
    }

    return res.json(products);
  });
};

exports.put = function(req,res){
  var data = req.body;

  Product.findOneAndUpdate({product_id: data.product_id}, data, function(err, products) {
    if (err) {
      return res.status(500).json({ message: err });
    }

    return res.json(products);
  });

  return res.json(doc);
};

exports.getOne = function(req,res){

  Product.findOne({
    product_id: req.params['id']
  }, function(err, product) {
    if (err) {
      return res.status(500).json({ message: err });
    }

    return res.json(product);
  });
};

exports.delete = function(req,res){

  Product.deleteOne({
    product_id: req.params['id']
  }, function(err, product) {
    if (err) {
      return res.status(500).json({ message: err });
    }

    return res.json(product);
  });
};