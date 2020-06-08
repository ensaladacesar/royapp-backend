const db = require('../bd/bd');

const createActividad = (request, response) => {
    const { alumno_id, descripcion, fecha } = request.body;
    db.pool.query("INSERT INTO actividades (alumno_id, descripcion, fecha) VALUES ($1, $2, $3) ", [alumno_id, descripcion, fecha],(error, results)=>{
        if(error){
            response.status(401).send(error.stack);
        }
        else{
            response.status(201).send(results);
        }
    })
}

const getActividad = (request, response) => {
    db.pool.query("SELECT * FROM actividades", (error, results) =>{
        if(error){
            response.status(401).send(error.stack);
        }
        else{
            response.status(202).send(results.rows);
        }
    })
}

const deleteActividad = (request, response) => {
    const { actividad_id } = request.body;

    console.log(request.body);
    db.pool.query("DELETE FROM actividades WHERE act_id=$1", [actividad_id], (error, results) => {
        if (error) {
            response.status(401).send(error);
        } else {
            response.status(201).send(results);
        }
    });
}

module.exports = {
    createActividad,
    getActividad,
    deleteActividad
}