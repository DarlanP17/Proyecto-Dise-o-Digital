import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importar rutas
import serviciosRoutes from './api/routes/serviciosRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/servicios', serviciosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Citas funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: error.message || 'Error interno del servidor'
  });
});

// Ruta no encontrada 
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Base de datos: ${process.env.DB_NAME}`);
});