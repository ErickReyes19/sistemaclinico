/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `empleadoId` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `servicioId` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `citaId` on the `Consulta` table. All the data in the column will be lost.
  - You are about to drop the column `expedienteId` on the `Consulta` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Consulta` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Prueba` table. All the data in the column will be lost.
  - You are about to drop the `ArchivoExpediente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PruebaArchivo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `consultaId` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clienteId` to the `Consulta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empleadoId` to the `Consulta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ArchivoExpediente` DROP FOREIGN KEY `ArchivoExpediente_expedienteId_fkey`;

-- DropForeignKey
ALTER TABLE `Cita` DROP FOREIGN KEY `Cita_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `Cita` DROP FOREIGN KEY `Cita_empleadoId_fkey`;

-- DropForeignKey
ALTER TABLE `Cita` DROP FOREIGN KEY `Cita_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `Consulta` DROP FOREIGN KEY `Consulta_citaId_fkey`;

-- DropForeignKey
ALTER TABLE `Consulta` DROP FOREIGN KEY `Consulta_expedienteId_fkey`;

-- DropForeignKey
ALTER TABLE `Prueba` DROP FOREIGN KEY `Prueba_consultaId_fkey`;

-- DropForeignKey
ALTER TABLE `PruebaArchivo` DROP FOREIGN KEY `PruebaArchivo_pruebaId_fkey`;

-- DropIndex
DROP INDEX `Cita_clienteId_fkey` ON `Cita`;

-- DropIndex
DROP INDEX `Cita_empleadoId_fkey` ON `Cita`;

-- DropIndex
DROP INDEX `Cita_servicioId_fkey` ON `Cita`;

-- DropIndex
DROP INDEX `Consulta_citaId_fkey` ON `Consulta`;

-- DropIndex
DROP INDEX `Consulta_expedienteId_fkey` ON `Consulta`;

-- AlterTable
ALTER TABLE `Cita` DROP COLUMN `clienteId`,
    DROP COLUMN `empleadoId`,
    DROP COLUMN `servicioId`,
    ADD COLUMN `consultaId` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `Cliente` MODIFY `numeroIdentificacion` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `Consulta` DROP COLUMN `citaId`,
    DROP COLUMN `expedienteId`,
    DROP COLUMN `fecha`,
    ADD COLUMN `clienteId` VARCHAR(36) NOT NULL,
    ADD COLUMN `empleadoId` VARCHAR(36) NOT NULL,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL DEFAULT 'abierta',
    ADD COLUMN `fechaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `diagnostico` TEXT NULL;

-- AlterTable
ALTER TABLE `Prueba` DROP COLUMN `fecha`;

-- DropTable
DROP TABLE `ArchivoExpediente`;

-- DropTable
DROP TABLE `PruebaArchivo`;

-- CreateTable
CREATE TABLE `ConsultaServicio` (
    `consultaId` VARCHAR(36) NOT NULL,
    `servicioId` VARCHAR(36) NOT NULL,
    `precioUnitario` DECIMAL(10, 2) NOT NULL,
    `cantidad` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`consultaId`, `servicioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Archivo` (
    `id` VARCHAR(191) NOT NULL,
    `entidad` VARCHAR(191) NOT NULL,
    `entidadId` VARCHAR(36) NOT NULL,
    `ruta` VARCHAR(255) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Archivo_entidad_entidadId_idx`(`entidad`, `entidadId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ConsultaToExpediente` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ConsultaToExpediente_AB_unique`(`A`, `B`),
    INDEX `_ConsultaToExpediente_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArchivoToPrueba` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ArchivoToPrueba_AB_unique`(`A`, `B`),
    INDEX `_ArchivoToPrueba_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArchivoToExpediente` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ArchivoToExpediente_AB_unique`(`A`, `B`),
    INDEX `_ArchivoToExpediente_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Cita_consultaId_idx` ON `Cita`(`consultaId`);

-- CreateIndex
CREATE INDEX `Consulta_clienteId_idx` ON `Consulta`(`clienteId`);

-- CreateIndex
CREATE INDEX `Consulta_empleadoId_idx` ON `Consulta`(`empleadoId`);

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consulta` ADD CONSTRAINT `Consulta_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `Empleados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `Consulta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsultaServicio` ADD CONSTRAINT `ConsultaServicio_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `Consulta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsultaServicio` ADD CONSTRAINT `ConsultaServicio_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `ServicioClinico`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prueba` ADD CONSTRAINT `Prueba_consultaId_fkey` FOREIGN KEY (`consultaId`) REFERENCES `Consulta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ConsultaToExpediente` ADD CONSTRAINT `_ConsultaToExpediente_A_fkey` FOREIGN KEY (`A`) REFERENCES `Consulta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ConsultaToExpediente` ADD CONSTRAINT `_ConsultaToExpediente_B_fkey` FOREIGN KEY (`B`) REFERENCES `Expediente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArchivoToPrueba` ADD CONSTRAINT `_ArchivoToPrueba_A_fkey` FOREIGN KEY (`A`) REFERENCES `Archivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArchivoToPrueba` ADD CONSTRAINT `_ArchivoToPrueba_B_fkey` FOREIGN KEY (`B`) REFERENCES `Prueba`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArchivoToExpediente` ADD CONSTRAINT `_ArchivoToExpediente_A_fkey` FOREIGN KEY (`A`) REFERENCES `Archivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArchivoToExpediente` ADD CONSTRAINT `_ArchivoToExpediente_B_fkey` FOREIGN KEY (`B`) REFERENCES `Expediente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Expediente` RENAME INDEX `Expediente_clienteId_fkey` TO `Expediente_clienteId_idx`;

-- RenameIndex
ALTER TABLE `Expediente` RENAME INDEX `Expediente_empleadoId_fkey` TO `Expediente_empleadoId_idx`;

-- RenameIndex
ALTER TABLE `Prueba` RENAME INDEX `Prueba_consultaId_fkey` TO `Prueba_consultaId_idx`;
