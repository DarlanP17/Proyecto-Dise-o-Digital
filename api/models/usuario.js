import { pool } from '../config/database.js';

export class UsuarioModel {

  static async getUserbyEmail(email) {
    try {
        const [usuario] = await pool.query("SELECT * FROM usuarios WHERE email = ?",[email])
        return usuario[0]
    } catch (error) {
        throw new Error(`Error del servidor: ${error.message}`);
    }
  }

  static async insertUser({nombre,email,password,rol}){
    try {
        await pool.query(`INSERT INTO usuarios (id, nombre, email, password, rol)
                            VALUES (UUID(), ?, ?, ?, ?)`,[nombre,email,password,rol])
    } catch (error) {
        throw new Error(`Error del servidor: ${error.message}`);
    }
  }
}
