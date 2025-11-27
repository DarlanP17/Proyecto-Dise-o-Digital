import { pool } from '../config/database.js';

class CitasService {
  static async createCita({ usuario_id, servicio_id, fecha, hora_inicio, estado }) {
    try {
      // Verificar que el servicio existe para evitar fallo de FK y dar un error claro
      const [servRows] = await pool.query('SELECT id FROM servicios WHERE id = ?', [servicio_id]);
      if (!servRows || servRows.length === 0) {
        const err = new Error('Servicio no encontrado');
        err.status = 400;
        throw err;
      }

      await pool.query(
        `INSERT INTO citas (id, usuario_id, servicio_id, fecha, hora_inicio, estado) VALUES (UUID(), ?, ?, ?, ?, ?)`,
        [usuario_id, servicio_id, fecha, hora_inicio, estado || 'programada']
      );

      const [rows] = await pool.query(
        `SELECT * FROM citas WHERE usuario_id = ? AND servicio_id = ? AND fecha = ? AND hora_inicio = ? ORDER BY created_at DESC LIMIT 1`,
        [usuario_id, servicio_id, fecha, hora_inicio]
      );

      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error al crear cita: ${error.message}`);
    }
  }

  static async getAllCitas(filters = {}) {
    try {
      const conditions = [];
      const params = [];

      if (filters.usuario_id) {
        conditions.push('usuario_id = ?');
        params.push(filters.usuario_id);
      }
      if (filters.servicio_id) {
        conditions.push('servicio_id = ?');
        params.push(filters.servicio_id);
      }
      if (filters.fecha) {
        conditions.push('fecha = ?');
        params.push(filters.fecha);
      }
      if (filters.estado) {
        conditions.push('estado = ?');
        params.push(filters.estado);
      }

      const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
      const [rows] = await pool.query(`SELECT * FROM citas ${where} ORDER BY fecha, hora_inicio`, params);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener citas: ${error.message}`);
    }
  }

  static async getCitaById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM citas WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error al obtener cita: ${error.message}`);
    }
  }

  static async updateCitaById(id, data) {
    const updates = [];
    const params = [];

    if (data.usuario_id) { updates.push('usuario_id = ?'); params.push(data.usuario_id); }
    if (data.servicio_id) { updates.push('servicio_id = ?'); params.push(data.servicio_id); }
    if (data.fecha) { updates.push('fecha = ?'); params.push(data.fecha); }
    if (data.hora_inicio) { updates.push('hora_inicio = ?'); params.push(data.hora_inicio); }
    if (data.estado) { updates.push('estado = ?'); params.push(data.estado); }

    if (!updates.length) {
      return await this.getCitaById(id);
    }

    params.push(id);
    try {
      const [result] = await pool.query(`UPDATE citas SET ${updates.join(', ')} WHERE id = ?`, params);
      if (result.affectedRows === 0) throw new Error('Cita no encontrada');
      return await this.getCitaById(id);
    } catch (error) {
      throw new Error(`Error al actualizar cita: ${error.message}`);
    }
  }

  static async deleteCitaById(id) {
    try {
      const [result] = await pool.query('DELETE FROM citas WHERE id = ?', [id]);
      if (result.affectedRows === 0) throw new Error('Cita no encontrada');
      return { message: 'Cita eliminada correctamente' };
    } catch (error) {
      throw new Error(`Error al eliminar cita: ${error.message}`);
    }
  }
}

export default CitasService;