import pool from '../config/database.js';

export class Servicio {
  static async getAll() {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM servicios WHERE activo = TRUE ORDER BY nombre'
      );
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener servicios: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM servicios WHERE id = ? AND activo = TRUE',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error al obtener servicio: ${error.message}`);
    }
  }

  static async create(servicioData) {
    const { nombre, descripcion, precio, duracion_minutos } = servicioData;
    
    try {
      const [result] = await pool.execute(
        'INSERT INTO servicios (id, nombre, descripcion, precio, duracion_minutos) VALUES (UUID(), ?, ?, ?, ?)',
        [nombre, descripcion, precio, duracion_minutos]
      );
      
      // Obtener el servicio recién creado
      const [newService] = await pool.execute(
        'SELECT * FROM servicios WHERE id = LAST_INSERT_ID()'
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
      const [result] = await pool.execute(
        'UPDATE servicios SET nombre = ?, descripcion = ?, precio = ?, duracion_minutos = ? WHERE id = ? AND activo = TRUE',
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
      // Soft delete - marcamos como inactivo
      const [result] = await pool.execute(
        'UPDATE servicios SET activo = FALSE WHERE id = ?',
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