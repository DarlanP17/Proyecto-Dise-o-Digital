import express from 'express';
import { login } from '../controllers/usuariosController.js';
import { newUser } from '../controllers/usuariosController.js';

const usuariosRouter = express.Router();

usuariosRouter.post('/login', login);

usuariosRouter.post('/signup',newUser)

export default usuariosRouter;