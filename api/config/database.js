import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// Probar conexión
try {
  const connection = await pool.getConnection();
  console.log('Conectado a la base de datos MySQL');
  connection.release();
} catch (error) {
  console.error(' Error conectando a la base de datos:', error.message);
}