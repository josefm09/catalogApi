'use strict';

let mongoose = require('mongoose'),
  Product = mongoose.model('Product');

exports.post = function(req,res){
  let newProduct = new Product(req.body);

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

exports.get = function(req, res){

  Product.find({}, function(err, products) {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.json(products);
    }
  });
};

exports.put = function(req,res){
  let data = req.body;

  Product.findOneAndUpdate({product_id: data.product_id}, data, {new: true}, function(err, products) {
    if (err) {
      return res.status(500).json({ message: err });
    }

    return res.json(products);
  });

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