const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const port = 3004;
var fs = require('fs');
const privateKey = fs.readFileSync('cert/fuerza.key', 'utf8');
const certificate = fs.readFileSync('cert/fuerza.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
var server = https.createServer(credentials, app);
app.use(require('express-status-monitor')())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});



var userRoutes = require('./routes/user.routes');
userRoutes(app);

var cursosRoutes = require('./routes/cursos.routes');
cursosRoutes(app);

var alumnoRoutes = require('./routes/alumno.routes');
alumnoRoutes(app);

var actividadRoutes = require('./routes/actividad.routes');
actividadRoutes(app);

var calificacionRoutes = require('./routes/calificacion.routes');
calificacionRoutes(app);

var criterioRoutes = require('./routes/criterio.routes');
criterioRoutes(app);


app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

server.listen(3005, () => {
    console.log("App running over SSL starting on port : " + 3005);
});