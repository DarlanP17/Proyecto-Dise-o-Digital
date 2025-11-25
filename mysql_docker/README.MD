## Instrucciones para iniciar

### 1. Requisitos

Asegurarse de tener instalado:

- [Docker](https://www.docker.com/)

### 2. Levantar el contenedor

Desde la raíz del proyecto donde se encuentra el archivo `docker-compose.yml`, ejecuta:

```bash
docker compose up -d
```

si algo no inicia bien, antes de crear el contenedor ejecutar:

```bash
docker compose down -v
```

iniciará un contenedor MySQL con:

- Base de datos: `citasdb`
- Algunos datos precargados
- Tablas configuradas

---

## Datos de conexión

| Parámetro       | Valor          |
|-----------------|----------------|
| Host            | `localhost`    |
| Puerto          | `27827`        |
| Base de datos   | `citasdb`      |
| Usuario         | `admin`        |
| Contraseña      | `admin1234`    |
| Usuario root    | `root`         |
| Contraseña root | `admin1234`    |
