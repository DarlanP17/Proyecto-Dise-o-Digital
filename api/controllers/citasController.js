import CitasService from '../models/cita.js';
import citaSchema from '../Schemas/citaSchema.js';

class Citas {
  // ---- Handlers Express (controller) ----
  static async crear(req, res, next) {
    try {
      const validated = await citaSchema.parseAsync(req.body);
      const nueva = await CitasService.createCita(validated);
      res.status(201).json({ success: true, data: nueva });
    } catch (error) {
      next(error);
    }
  }

  static async listar(req, res, next) {
    try {
      const querySchema = citaSchema.pick({ usuario_id: true, servicio_id: true, fecha: true, estado: true }).partial();
      const query = await querySchema.parseAsync(req.query);
      const citas = await CitasService.getAllCitas(query);
      res.json({ success: true, data: citas });
    } catch (error) { next(error); }
  }

  static async obtener(req, res, next) {
    try {
      const { id } = req.params;
      const cita = await CitasService.getCitaById(id);
      if (!cita) return res.status(404).json({ success: false, message: 'Cita no encontrada' });
      res.json({ success: true, data: cita });
    } catch (error) { next(error); }
  }

  static async actualizar(req, res, next) {
    try {
      const { id } = req.params;
      const validated = await citaSchema.partial().parseAsync(req.body);
      const updated = await CitasService.updateCitaById(id, validated);
      res.json({ success: true, data: updated });
    } catch (error) { next(error); }
  }

  static async eliminar(req, res, next) {
    try {
      const { id } = req.params;
      const result = await CitasService.deleteCitaById(id);
      res.json({ success: true, data: result });
    } catch (error) { next(error); }
  }
}

export default Citas;