import { z } from 'zod';

export const citaSchema = z.object({
  usuario_id: z.string().min(1, 'usuario_id es requerido'),
  servicio_id: z.string().min(1, 'servicio_id es requerido'),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha debe ser YYYY-MM-DD'),
  hora_inicio: z.string().regex(/^\d{2}:\d{2}$/, 'Formato de hora debe ser HH:MM'),
  estado: z.enum(['programada', 'cancelada', 'completada']).optional()
});

export default citaSchema;
