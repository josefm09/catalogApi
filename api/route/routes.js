'use strict';
module.exports = function(app) {
    var userHandlers = require('../controllers/userController.js');
    var productHandlers = require('../controllers/productController.js');
    var sellHandlers = require('../controllers/sellController.js')
    
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
    app.route('/product')
        .post(userHandlers.loginRequired, productHandlers.post);
    app.route('/product')
        .get(userHandlers.loginRequired, productHandlers.get);
    app.route('/product/:id')
        .get(userHandlers.loginRequired, productHandlers.getOne);
    app.route('/product')
        .put(userHandlers.loginRequired, productHandlers.put);
    app.route('/product/:id')
        .delete(userHandlers.loginRequired, productHandlers.delete);
    app.route('/sell')
        .post(userHandlers.loginRequired, sellHandlers.post);
    app.route('/sell')
        .get(userHandlers.loginRequired, sellHandlers.get);
};