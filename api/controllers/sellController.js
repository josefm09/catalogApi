'use strict';

let mongoose = require('mongoose'),
  Sell = mongoose.model('Sell'),
  Product = mongoose.model('Product');

exports.post = async function(req,res){
  const session = await mongoose.startSession();
  let newSell = new Sell(req.body);

  session.startTransaction();
 
  newSell.save(async function(err, sell) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      let promiseArr = [];
      sell.products.forEach(obj => {
        promiseArr.push(runUpdate(obj));
        Promise.all(promiseArr)
        .then((promRes) => res.json({ message: "Venta realizada correctamente" }))
        .catch(promErr => res.status(500).json({ message: "Existencia excedida" + promErr }))
      });
    }
  });

  session.endSession();
  
};

exports.get = function(req, res){

  Sell.find({}, function(err, sells) {
    if (err) {
      return res.status(500).json({ message: err });
    }

    return res.json(sells);
  });
};

function runUpdate(obj) {
  return new Promise((resolve, reject) => {

    Product.findOneAndUpdate({product_id: obj.idProduct, stock:{$gte: 1}}, {$inc: {stock: - (obj.quantity), sellTimes: obj.quantity}}, { new: true})
      .then(result => {
        if(result.stock < 0){
          session.abortTransaction();
        } else {
          resolve()
        }
      })
      .catch(err => reject(err))
  });
}