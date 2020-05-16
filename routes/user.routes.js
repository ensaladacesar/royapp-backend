module.exports = function(app) {
    var userController = require('../controllers/user.controller');

    app.route('/api/users/registration').post(userController.registration);
    
    app.route('/api/users/login').post(userController.login);
}