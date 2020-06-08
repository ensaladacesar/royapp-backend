const db = require('../bd/bd');
const bcrypt = require('bcrypt');

const registrationAlumno = (request, response) => {
    const { matricula, nombre, contraseña } = request.body;
    /**
     * Verificamos que no haya un registro identico
     */
    db.pool.query("SELECT * FROM alumno WHERE matricula = $1", [matricula], (error, results) => {
        if (error) {
            response.status(404).send(error.stack);
        } else
        if (results.rowCount > 0) {
            response.status(302).send("usuario ya existe");
        } else {
            /**
             * Uso de la librería bcrypt para cifrar la variable password y pasa a llamarse hash.
             */
            bcrypt.hash(contraseña, 10, function(error, hash) {
                if (error) {
                    response.status(400).send(error);
                } else {
                    // console.log(hash)
                    db.pool.query("INSERT INTO alumno ( nombre ,matricula , contraseña ) VALUES($1, $2, $3)", [nombre, matricula, hash], (error, results) => {
                        if (error) {
                            response.status(401).send(error.stack);
                        } else {
                            response.status(201).send(results);
                        }
                    });
                }
            });
        }
    })
}


const getAlumno = (request, response) => {

    db.pool.query("SELECT alumno_id, matricula, nombre FROM alumno ", (error, results) => {
        if (error) {
            response.status(401).send(error.stack);
        } else {
            response.status(200).send(results.rows);
        }
    });
}

const updateAlumno = (request, response) => {
    const { alumno_id, matricula, nombre } = request.body;

    console.log(request.body);
    db.pool.query("UPDATE alumno SET matricula=$1, nombre=$2 WHERE alumno_id =$3", [alumno_id ,matricula, nombre], (error, results) => {
        if (error) {
            response.status(401).send(error);
        } else {
            response.status(201).send(results);
        }
    });
}

const deleteAlumno = (request, response) => {
    const { alumno_id } = request.body;

    console.log(request.body);
    db.pool.query("DELETE FROM alumno WHERE alumno_id=$1", [alumno_id], (error, results) => {
        if (error) {
            response.status(401).send(error);
        } else {
            response.status(201).send(results);
        }
    });
}
module.exports = {
    getAlumno,
    updateAlumno,
    registrationAlumno,
    deleteAlumno
}