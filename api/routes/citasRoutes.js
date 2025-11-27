import express from 'express';
import Citas from '../controllers/citasController.js';

const citasRouter = express.Router();

citasRouter.post('/', Citas.crear);
citasRouter.get('/', Citas.listar);
citasRouter.get('/:id', Citas.obtener);
citasRouter.put('/:id', Citas.actualizar);
citasRouter.delete('/:id', Citas.eliminar);

export default citasRouter;