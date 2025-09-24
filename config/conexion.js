import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',
    user:  'root',
    password: '',
    database: 'tienda',
    connectionLimit: 5
});


pool.getConnection()
.then(connection => {
    console.log('Conexión exitosa a la base de datos');
    connection.release();
})
.catch(err => {
    console.error('Error de conexión a la base de datos:', err);
});