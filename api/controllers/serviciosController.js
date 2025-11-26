import { Servicio } from '../models/servicio.js';

export const serviciosController = {
  // Listar todos los servicios
  getAll: async (req, res, next) => {
    try {
      const servicios = await Servicio.getAll();
      res.json({
        success: true,
        data: servicios,
        message: 'Servicios obtenidos correctamente'
      });
    } catch (error) {
      next(error);
    }
  },

  // Crear nuevo servicio (solo admin)
  create: async (req, res, next) => {
    try {
      const { nombre, descripcion, precio, duracion_minutos } = req.body;

      // Validaciones básicas
      if (!nombre || !precio || !duracion_minutos) {
        return res.status(400).json({
          success: false,
          message: 'Nombre, precio y duración son obligatorios'
        });
      }

      if (precio <= 0) {
        return res.status(400).json({
          success: false,
          message: 'El precio debe ser mayor a 0'
        });
      }

      const nuevoServicio = await Servicio.create({
        nombre,
        descripcion: descripcion || '',
        precio: parseFloat(precio),
        duracion_minutos: parseInt(duracion_minutos)
      });

      res.status(201).json({
        success: true,
        data: nuevoServicio,
        message: 'Servicio creado correctamente'
      });
    } catch (error) {
      next(error);
    }
  },

  // Actualizar servicio (solo admin)
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, duracion_minutos } = req.body;

      if (!nombre || !precio || !duracion_minutos) {
        return res.status(400).json({
          success: false,
          message: 'Nombre, precio y duración son obligatorios'
        });
      }

      const servicioActualizado = await Servicio.update(id, {
        nombre,
        descripcion: descripcion || '',
        precio: parseFloat(precio),
        duracion_minutos: parseInt(duracion_minutos)
      });

      res.json({
        success: true,
        data: servicioActualizado,
        message: 'Servicio actualizado correctamente'
      });
    } catch (error) {
      next(error);
    }
  },

  // Eliminar servicio (solo admin)
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      const resultado = await Servicio.delete(id);
      
      res.json({
        success: true,
        data: resultado,
        message: 'Servicio eliminado correctamente'
      });
    } catch (error) {
      next(error);
    }
  }
};
