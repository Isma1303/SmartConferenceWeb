const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();
async function connectionDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            port: process.env.PORT,
            user: process.env.USER,
            password: process.env.PW,
            database: process.env.DB,
            ssl: {
                rejectUnauthorized: false
            }
        });
        console.log('Conexión exitosa de la base de datos');
        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
}

module.exports = connectionDB;