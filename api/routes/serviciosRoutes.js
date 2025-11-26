import express from 'express';
import { serviciosController } from '../controllers/serviciosController.js';

const router = express.Router();

// GET /api/servicios - Público
router.get('/', serviciosController.getAll);

// POST /api/servicios - Solo admin
router.post('/', serviciosController.create);

// PUT /api/servicios/:id - Solo admin
router.put('/:id', serviciosController.update);

// DELETE /api/servicios/:id - Solo admin
router.delete('/:id', serviciosController.delete);

export default router;


