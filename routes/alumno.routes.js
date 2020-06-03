module.exports = function(app) {
    var alumnoController = require('../controllers/alumno.controller');

    app.route('/api/alumno/registrationAlumno').post(alumnoController.registrationAlumno);

    app.route('/api/alumno/getAlumno').get(alumnoController.getAlumno);

    app.route('/api/alumno/updateAlumno').post(alumnoController.updateAlumno);

    app.route('/api/alumno/deleteAlumno').post(alumnoController.deleteAlumno);
}