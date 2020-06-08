module.exports = function(app) {
    var cursoController = require('../controllers/cursos.controller');

    app.route('/api/cursos/createCurso').post(cursoController.createCurso);

    app.route('/api/cursos/getCurso').get(cursoController.getCurso);
}