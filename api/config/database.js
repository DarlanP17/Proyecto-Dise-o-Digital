import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

// Probar la conexión
try {
  const connection = await pool.getConnection();
  console.log('Conectado a la base de datos MySQL');
  connection.release();
} catch (error) {
  console.error('Error conectando a la base de datos:', error.message);
}

export default pool;