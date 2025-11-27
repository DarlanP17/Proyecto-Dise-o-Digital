import express from 'express';
import { serviciosController } from '../controllers/serviciosController.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// GET /api/servicios - Público
router.get('/', serviciosController.getAll);

// POST /api/servicios - Solo admin (protegido)
router.post('/', isAuth, isAdmin, serviciosController.create);

// PUT /api/servicios/:id - Solo admin (protegido)
router.put('/:id', isAuth, isAdmin, serviciosController.update);

// DELETE /api/servicios/:id - Solo admin (protegido)
router.delete('/:id', isAuth, isAdmin, serviciosController.delete);

export default router;