import { pool } from '../config/database.js';

export class Servicio {
  static async getAll() {
    try {
      const [results] = await pool.query("SELECT * FROM servicios WHERE activo = TRUE ORDER BY nombre");
      return results;
    } catch (error) {
      throw new Error(`Error al obtener servicios: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const [results] = await pool.query("SELECT * FROM servicios WHERE id = ? AND activo = TRUE", [id]);
      return results[0] || null;
    } catch (error) {
      throw new Error(`Error al obtener servicio: ${error.message}`);
    }
  }

  static async create(servicioData) {
    const { nombre, descripcion, precio, duracion_minutos } = servicioData;
    
    try {
      await pool.query(
        `INSERT INTO servicios (id, nombre, descripcion, precio, duracion_minutos) 
         VALUES (UUID(), ?, ?, ?, ?)`,
        [nombre, descripcion, precio, duracion_minutos]
      );
      
      const [newService] = await pool.query(
        "SELECT * FROM servicios WHERE nombre = ? ORDER BY id DESC LIMIT 1",
        [nombre]
      );
      
      return newService[0];
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Ya existe un servicio con ese nombre');
      }
      throw new Error(`Error al crear servicio: ${error.message}`);
    }
  }

  static async update(id, servicioData) {
    const { nombre, descripcion, precio, duracion_minutos } = servicioData;
    
    try {
      const [result] = await pool.query(
        "UPDATE servicios SET nombre = ?, descripcion = ?, precio = ?, duracion_minutos = ? WHERE id = ? AND activo = TRUE",
        [nombre, descripcion, precio, duracion_minutos, id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Servicio no encontrado');
      }
      
      return await this.getById(id);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Ya existe un servicio con ese nombre');
      }
      throw new Error(`Error al actualizar servicio: ${error.message}`);
    }
  }

  static async delete(id) {
  try {
    
    const [servicioExistente] = await pool.query(
      "SELECT * FROM servicios WHERE id = ?",
      [id]
    );    
    const [result] = await pool.query(
      "UPDATE servicios SET activo = FALSE WHERE id = ?",
      [id]
    );
        
    if (result.affectedRows === 0) {
      throw new Error('Servicio no encontrado');
    }
    return { message: 'Servicio eliminado correctamente' };
  } catch (error) {
    throw new Error(`Error al eliminar servicio: ${error.message}`);
  }
}
}
