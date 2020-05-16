const db = require('../bd/bd');

const registration = (request, response) => {
    const { name, profesor_id } = request.body;
    db.pool.query("INSERT INTO cursos (name, profesor_id) VALUES ($1, $2) ", [name, profesor_id],(error, results)=>{
        if(error){
            response.status(401).send(error.stack);
        }
        else{
            response.status(201).send(results);
        }
    })
}
module.exports = {
    registration
}