const db = require('../bd/bd');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registration = (request, response) => {
    const { email, name, password } = request.body;
    /**
     * Verificamos que no haya un registro identico
     */
    db.pool.query("SELECT * FROM profesor WHERE email = $1", [email],(error, results) =>{
        if (error) {
            response.status(404).send(error.stack);
        } else
        if(results.rowCount > 0) {
            response.status(302).send("usuario ya existe");
        }
        else{
            /**
             * Uso de la librería bcrypt para cifrar la variable password y pasa a llamarse hash.
             */
            bcrypt.hash(password, 10, function(error, hash) {
                if (error) {
                    response.status(400).send(error);
                } else {
                    // console.log(hash)
                    db.pool.query("INSERT INTO profesor ( name ,email , password ) VALUES($1, $2, $3)", [name, email, hash], (error, results) => {
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

const login = (request, response) => {

    const { email, password } = request.body;

    db.pool.query("SELECT * FROM profesor WHERE email = $1", [email], (error, results) => {
        if (error) {
            response.status(404).send('hay un error aqui');
        } else {
            if ( results.rowCount == 0){
                response.status(404).send('Usuario no existe.');
            } else {
                const result = results.rows[0];
                if (result && bcrypt.compareSync(password, result.password)) {
                    var tokenData = {
                        profesor_id: result.user_id,
                        name: result.name,
                        email: result.email
                    }
                    /**
                     * Expiración de tokenData.
                     */
                    var token = jwt.sign({ tokenData }, 'prueba', {
                        expiresIn: 60 * 60 * 24
                    });
                    response.status(200).send({
                        token: token
                    });
                } else {
                    response.status(403).send('Contraseña incorrecta.');
                }
            }            
        }
    });
}
module.exports = {
    registration,
    login
}