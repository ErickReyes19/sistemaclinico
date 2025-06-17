-- CreateTable
CREATE TABLE `Empleados` (
    `id` VARCHAR(36) NOT NULL,
    `puesto_id` VARCHAR(36) NOT NULL,
    `numeroIdentificacion` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(100) NOT NULL,
    `correo` LONGTEXT NOT NULL,
    `FechaNacimiento` DATETIME(6) NULL,
    `fechaIngreso` DATETIME(6) NULL,
    `telefono` VARCHAR(20) NULL,
    `genero` VARCHAR(20) NULL,
    `activo` BIT(1) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `IX_Empleados_puesto_id`(`puesto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Puesto` (
    `Id` VARCHAR(36) NOT NULL,
    `Nombre` VARCHAR(100) NOT NULL,
    `Descripcion` VARCHAR(100) NOT NULL,
    `Activo` BIT(1) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permiso` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    UNIQUE INDEX `Permiso_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolPermiso` (
    `id` VARCHAR(191) NOT NULL,
    `rolId` VARCHAR(191) NOT NULL,
    `permisoId` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RolPermiso_permisoId_fkey`(`permisoId`),
    UNIQUE INDEX `RolPermiso_rolId_permisoId_key`(`rolId`, `permisoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    UNIQUE INDEX `Rol_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `id` VARCHAR(36) NOT NULL,
    `empleado_id` VARCHAR(36) NOT NULL,
    `usuario` VARCHAR(50) NOT NULL,
    `contrasena` LONGTEXT NOT NULL,
    `DebeCambiarPassword` BOOLEAN NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `rol_id` VARCHAR(36) NOT NULL,
    `activo` BIT(1) NOT NULL,

    UNIQUE INDEX `IX_Usuarios_empleado_id`(`empleado_id`),
    INDEX `IX_Usuarios_rol_id`(`rol_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `token` VARCHAR(128) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PasswordResetToken_token_key`(`token`),
    INDEX `IX_PasswordResetToken_userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido` VARCHAR(100) NOT NULL,
    `correo` VARCHAR(150) NULL,
    `telefono` VARCHAR(20) NULL,
    `fechaNacimiento` DATETIME(3) NULL,
    `genero` VARCHAR(20) NULL,
    `numeroIdentificacion` VARCHAR(20) NOT NULL,
    `direccion` VARCHAR(255) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cliente_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicioClinico` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `duracionMin` INTEGER NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cita` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(36) NOT NULL,
    `empleadoId` VARCHAR(36) NOT NULL,
    `servicioId` VARCHAR(36) NOT NULL,
    `fechaHora` DATETIME(3) NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'pendiente',
    `notas` TEXT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expediente` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(36) NOT NULL,
    `empleadoId` VARCHAR(36) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArchivoExpediente` (
    `id` VARCHAR(191) NOT NULL,
    `expedienteId` VARCHAR(36) NOT NULL,
    `archivo` VARCHAR(255) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consulta` (
    `id` VARCHAR(191) NOT NULL,
    `citaId` VARCHAR(36) NULL,
    `expedienteId` VARCHAR(36) NULL,
    `diagnostico` TEXT NOT NULL,
    `recomendaciones` TEXT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prueba` (
    `id` VARCHAR(191) NOT NULL,
    `consultaId` VARCHAR(36) NOT NULL,
    `tipo` VARCHAR(100) NOT NULL,
    `resultado` TEXT NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PruebaArchivo` (
    `id` VARCHAR(191) NOT NULL,
    `pruebaId` VARCHAR(36) NOT NULL,
    `archivo` VARCHAR(255) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `FK_Empleados_Puesto_puesto_id` FOREIGN KEY (`puesto_id`) REFERENCES `Puesto`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RolPermiso` ADD CONSTRAINT `RolPermiso_permisoId_fkey` FOREIGN KEY (`permisoId`) REFERENCES `Permiso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolPermiso` ADD CONSTRAINT `RolPermiso_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `FK_Usuarios_Empleados_empleado_id` FOREIGN KEY (`empleado_id`) REFERENCES `Empleados`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `Empleados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `ServicioClinico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expediente` ADD CONSTRAINT `Expediente_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expediente` ADD CONSTRAINT `Expediente_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `Empleados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArchivoExpediente` ADD CONSTRAINT `ArchivoExpediente_expedienteId_fkey` FOREIGN KEY (`expedienteId`) REFERENCES `Expediente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_citaId_fkey` FOREIGN KEY (`citaId`) REFERENCES `Cita`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_expedienteId_fkey` FOREIGN KEY (`expedienteId`) REFERENCES `Expediente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prueba` ADD CONSTRAINT `Prueba_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `Consulta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PruebaArchivo` ADD CONSTRAINT `PruebaArchivo_pruebaId_fkey` FOREIGN KEY (`pruebaId`) REFERENCES `Prueba`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
