'use strict';
module.exports = function(app) {
    let userHandlers = require('../controllers/userController.js');
    let productHandlers = require('../controllers/productController.js');
    let sellHandlers = require('../controllers/sellController.js')
    
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
    app.route('/product')
        .post(productHandlers.post);
    app.route('/product')
        .get(productHandlers.get);
    app.route('/product/:id')
        .get(productHandlers.getOne);
    app.route('/product')
        .put(productHandlers.put);
    app.route('/product/:id')
        .delete(productHandlers.delete);
    app.route('/sell')
        .post(sellHandlers.post);
    app.route('/sell')
        .get(sellHandlers.get);
};