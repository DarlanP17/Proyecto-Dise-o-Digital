import express from 'express';
import Citas from '../controllers/citasController.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const citasRouter = express.Router();

citasRouter.post('/', isAuth, Citas.crear);
citasRouter.get('/', isAuth, Citas.listar);
citasRouter.get('/:id', isAuth, Citas.obtener);
citasRouter.put('/:id', isAuth, Citas.actualizar);
citasRouter.delete('/:id', isAuth, Citas.eliminar);

export default citasRouter;