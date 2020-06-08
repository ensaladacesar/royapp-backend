module.exports = function(app){
    criteriosController = require('../controllers/criterios.controller');

    app.route('/api/criterios/createCriterio').post(criteriosController.createCriterio);

    app.route('/api/criterios/getCriterio').get(criteriosController.getCriterio);

    app.route('/api/criterios/deleteCriterio').post(criteriosController.deleteCriterio);
}