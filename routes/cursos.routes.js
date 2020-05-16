module.exports = function(app) {
    var cursoController = require('../controllers/cursos.controller');

    app.route('/api/users/registration')
        .post(cursoController.registration);
}