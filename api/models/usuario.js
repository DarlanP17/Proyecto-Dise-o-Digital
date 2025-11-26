import { pool } from '../config/database.js';

export class Usuario {

  static async getUserbyEmail(email) {
    try {
        const [usuario] = await pool.query("SELECT * FROM usuarios WHERE email = ?",[email])
        return usuario[0]
    } catch (error) {
        throw new Error(`Error al obtener servicio: ${error.message}`);
    }
  }


}
