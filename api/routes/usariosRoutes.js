import express from 'express';
import { login } from '../controllers/usuariosController.js';

const usuariosRouter = express.Router();

usuariosRouter.post('/login', login);

export default usuariosRouter;