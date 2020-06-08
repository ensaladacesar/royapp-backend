module.exports = function(app) {
    var actividadController = require('../controllers/actividad.controller');

    app.route('/api/actividad/createActividad').post(actividadController.createActividad);

    app.route('/api/actividad/getActividad').get(actividadController.getActividad);

    app.route('/api/actividad/deleteActividad').post(actividadController.deleteActividad);
}