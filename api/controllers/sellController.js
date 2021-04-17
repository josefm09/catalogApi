'use strict';

var mongoose = require('mongoose'),
  Sell = mongoose.model('Sell');

exports.post = function(req,res){
  var newSell = new Sell(req.body);

  newSell.save(function(err, sell) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {;
      return res.json(sell);
    }
  });
};

exports.get = function(res){

  Sell.find({}, function(err, sells) {
    if (err) {
      return res.status(500).json({ message: err });
    }

    return res.json(sells);
  });
};
