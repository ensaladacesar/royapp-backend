const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'chihuaroot',
    host: 'hexbird.mx',
    database: 'roy_app',
    password: '%11Ev2xd',
    port: 5432
});

module.exports={
    pool
}