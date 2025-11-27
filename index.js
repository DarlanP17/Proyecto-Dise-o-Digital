import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importar rutas
import serviciosRoutes from './api/routes/serviciosRoutes.js';
import usuariosRouter from './api/routes/usariosRoutes.js';
import citasRoutes from './api/routes/citasRoutes.js';
import { errorHandler } from './api/utils/handleErrors.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/servicios', serviciosRoutes);
app.use('/api/auth', usuariosRouter);
app.use('/api/citas', citasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Citas funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Ruta no encontrada 
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware centralizado de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Base de datos: ${process.env.DB_NAME}`);
});