const db = require('../bd/bd');

const InsertCalificacion = (request, response) => {
    const { alumno_id, curso_id, calif } = request.body;
    db.pool.query("INSERT INTO calificacion (alumno_id, curso_id, calif) VALUES ($1, $2, $3) ", [alumno_id, curso_id, calif],(error, results)=>{
        if(error){
            response.status(401).send(error.stack);
        }
        else{
            response.status(201).send(results);
        }
    })
}

const getCalificacion = (request, response) => {
    db.pool.query("SELECT * FROM calificacion", (error, results) =>{
        if(error){
            response.status(401).send(error.stack);
        }
        else{
            response.status(202).send(results);
        }
    })
}

const deleteCalificacion = (request, response) => {
    const { calif_id } = request.body;

    console.log(request.body);
    db.pool.query("DELETE FROM calificacion WHERE calif_id=$1", [calif_id], (error, results) => {
        if (error) {
            response.status(401).send(error);
        } else {
            response.status(201).send(results);
        }
    });
}

module.exports = {
    InsertCalificacion,
    getCalificacion,
    deleteCalificacion
}