module.exports = function(app){
    var calificacionController = require('../controllers/calificacion.controller');

    app.route('/api/calificacion/insertCalificacion').post(calificacionController.InsertCalificacion);

    app.route('/api/alumno/getAlumno').get(calificacionController.getCalificacion);

    app.route('/api/alumno/deleteAlumno').post(calificacionController.deleteCalificacion);
}