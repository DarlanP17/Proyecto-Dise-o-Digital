-- Eliminar tablas existentes
DROP TABLE IF EXISTS citas;
DROP TABLE IF EXISTS servicios;
DROP TABLE IF EXISTS usuarios;

-- CREACION DE LA TABLA USUARIOS
CREATE TABLE usuarios (
    id CHAR(36) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('cliente', 'admin') NOT NULL DEFAULT 'cliente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CREACION DE LA TABLA SERVICIOS
CREATE TABLE servicios (
    id CHAR(36) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    duracion_minutos INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- CREACION DE LA TABLA CITAS
CREATE TABLE citas (
    id CHAR(36) PRIMARY KEY,
    usuario_id CHAR(36) NOT NULL,
    servicio_id CHAR(36) NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    estado ENUM('programada', 'cancelada', 'completada') NOT NULL DEFAULT 'programada',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE RESTRICT
);

INSERT INTO usuarios (id,nombre, email, password, rol) VALUES 
(UUID(),'Administrador', 'admin@example.com', "$argon2id$v=19$m=16,t=2,p=1$SGRPOFhLNnI3ek1BZTNaVQ$4eubdbonYgvlwR3WF9Xffw", 'admin');

INSERT INTO servicios (id,nombre, descripcion, precio, duracion_minutos) VALUES 
(UUID(),'Atencion Dental', 'Limpieza dental profesional', 15.00, 30),
(UUID(),'Examen de rayos x', 'Revision de problemas oseos', 45.50, 90);