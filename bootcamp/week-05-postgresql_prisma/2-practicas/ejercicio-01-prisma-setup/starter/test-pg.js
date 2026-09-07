const { Client } = require('pg');

const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'bootcamp',
  password: 'bootcamp123',
  database: 'bootcamp_dev',
});

client.connect()
  .then(() => {
    console.log('Conexion exitosa');
    return client.query('SELECT NOW()');
  })
  .then((res) => {
    console.log('Hora del servidor:', res.rows[0]);
    return client.end();
  })
  .catch((err) => {
    console.error('Error de conexion:', err.message);
    process.exit(1);
  });
