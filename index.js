import express from 'express';
import { loadEnvFile } from 'node:process'

loadEnvFile()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
})