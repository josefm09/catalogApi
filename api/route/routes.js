'use strict';
module.exports = function(app) {
    var userHandlers = require('../controllers/userController.js');
    var productHandlers = require('../controllers/productController.js');
    
    app.route('/tasks')
        .post(userHandlers.loginRequired, userHandlers.profile);
    app.route('/auth/register')
        .post(userHandlers.register);
   app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
    app.route('/product')
        .post(userHandlers.loginRequired, productHandlers.post);
    app.route('/product')
        .get(userHandlers.loginRequired, productHandlers.get);
};