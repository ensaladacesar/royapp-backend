const db = require('../bd/bd');

const createCriterio = (request, response) => {
    const { nombre, curso_id,porcentaje } = request.body;
    db.pool.query("INSERT INTO criterios (nombre,curso_id,porcentaje) VALUES ($1, $2, $3) ", [nombre, curso_id, porcentaje],(error, results)=>{
        if(error){
            response.status(401).send(error.stack);
        }
        else{
            response.status(201).send(results);
        }
    })
}

const getCriterio = (request, response) => {
    db.pool.query("SELECT * FROM criterios", (error, results) =>{
        if(error){
            response.status(401).send(error.stack);
        }
        else{
            response.status(202).send(results.rows);
        }
    })
}

const deleteCriterio = (request, response) => {
    const { criterio_id } = request.body;

    console.log(request.body);
    db.pool.query("DELETE FROM criterios WHERE criterio_id=$1", [criterio_id], (error, results) => {
        if (error) {
            response.status(401).send(error);
        } else {
            response.status(201).send(results);
        }
    });
}

module.exports = {
    createCriterio,
    getCriterio,
    deleteCriterio
}