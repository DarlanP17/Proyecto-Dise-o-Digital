# Desarrolladores

José Daniel Alonzo Garay #20232000922
Daniel Eduardo Girón Medina #20222000528
Darlan Josue Perdomo Fajardo #20222000729

# API de Reservación de Citas

API RESTful para gestión de citas médicas/servicios desarrollada con Node.js, Express y MySQL.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Endpoints de la API](#endpoints-de-la-api)
  - [Autenticación](#autenticación)
  - [Servicios](#servicios)
  - [Citas](#citas)

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar](https://nodejs.org/)
- **Docker Desktop** - [Descargar](https://www.docker.com/products/docker-desktop/)
- **Git** - [Descargar](https://git-scm.com/)

Verifica las instalaciones:

```bash
node --version    # v18.x.x o superior
npm --version     # 9.x.x o superior
docker --version  # Docker version 24.x.x o superior
```

---


### Endpoints (resumido)

**Base:** `http://localhost:3000/api`

### Autenticación

POST `/api/auth/register` — Registro de usuario.

POST `/api/auth/login` — Inicio de sesión; devuelve JWT.

Ejemplo (register body):
```json
{ "nombre": "Juan", "email": "juan@x.com", "password": "secret" }
```

---

### Servicios

GET `/api/servicios` — Listar todos los servicios (público).

POST `/api/servicios` — Crear servicio (Protegido, rol: `admin`).

PUT `/api/servicios/:id` — Actualizar servicio (Protegido, `admin`).

DELETE `/api/servicios/:id` — Eliminar servicio (Protegido, `admin`).

Ejemplo (crear servicio body):
```json
{ "nombre": "Consulta", "descripcion": "...", "precio": 25.0, "duracion_minutos": 45 }
```

---

### Citas

GET `/api/citas` — Ver las citas del usuario (propias). Protegido.

POST `/api/citas` — Crear nueva cita. Protegido. `usuario_id` se toma del JWT.

DELETE `/api/citas/:id` — Cancelar cita (propio). Protegido.

GET `/api/admin/citas` — Ver todas las citas (Protegido, `admin`).

Ejemplo (crear cita body):
```json
{ "servicio_id": "UUID_DEL_SERVICIO", "fecha": "2025-12-01", "hora_inicio": "10:30" }
```

Notas:
- En rutas protegidas enviar header `Authorization: Bearer <token>`.
- `servicio_id` y `usuario_id` son UUIDs; no enviar números simples.

---

```json
{
  "usuario_id": "uuid-del-usuario",
  "servicio_id": "uuid-del-servicio",
  "fecha": "2025-12-01",
  "hora_inicio": "10:30"
}
```

**Validaciones:**
- `usuario_id`: String, requerido
- `servicio_id`: String, requerido
- `fecha`: Formato `YYYY-MM-DD`, requerido
- `hora_inicio`: Formato `HH:MM`, requerido
- `estado`: Opcional (`programada`, `cancelada`, `completada`)

**Respuesta exitosa (201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid-de-la-cita",
    "usuario_id": "uuid-del-usuario",
    "servicio_id": "uuid-del-servicio",
    "fecha": "2025-12-01",
    "hora_inicio": "10:30:00",
    "estado": "programada",
    "created_at": "2025-11-26T12:00:00.000Z"
  }
}
```

---

#### Listar citas

```http
GET /api/citas
```

**Query params opcionales:**

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `usuario_id` | Filtrar por usuario | `?usuario_id=uuid` |
| `servicio_id` | Filtrar por servicio | `?servicio_id=uuid` |
| `fecha` | Filtrar por fecha | `?fecha=2025-12-01` |
| `estado` | Filtrar por estado | `?estado=programada` |

**Ejemplo:**

```http
GET /api/citas?estado=programada&fecha=2025-12-01
```

---

#### Obtener cita por ID

```http
GET /api/citas/:id
```

---

#### Actualizar cita

```http
PUT /api/citas/:id
```

**Body (JSON) - Todos los campos son opcionales:**

```json
{
  "fecha": "2025-12-02",
  "hora_inicio": "14:00",
  "estado": "completada"
}
```

---

#### Eliminar cita

```http
DELETE /api/citas/:id
```

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "data": {
    "message": "Cita eliminada correctamente"
  }
}
```

---

## Usuario Admin por defecto

La base de datos viene con un usuario administrador pre-configurado:

| Campo | Valor |
|-------|-------|
| Email | `admin@example.com` |
| Password | `admin1234` |
| Rol | `admin` |

---

## Solución de Problemas

### Error: "Cannot connect to database"

1. Verifica que Docker esté corriendo
2. Verifica que el contenedor esté activo: `docker ps`
3. Revisa las variables en `.env`

### Reiniciar la base de datos

```bash
cd mysql_docker
docker-compose down -v
docker-compose up -d
```
