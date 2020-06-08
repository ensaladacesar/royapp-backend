const db = require('../bd/bd');

const createCurso = (request, response) => {
    const { name, profesor_id } = request.body;
    db.pool.query("INSERT INTO curso (name, profesor_id) VALUES ($1, $2) ", [name, profesor_id],(error, results)=>{
        if(error){
            response.status(401).send(error.stack);
        }
        else{
            response.status(201).send(results);
        }
    })
}

const getCurso = (request, response) => {
    db.pool.query("SELECT * FROM curso", (error, results) => {
        if (error) {
            response.status(401).send(error.stack);
        } else {
            response.status(200).send(results.rows);
        }
    });
}

const getCursoById = (request, response ) =>{
    
}
module.exports = {
    createCurso,
    getCurso
}