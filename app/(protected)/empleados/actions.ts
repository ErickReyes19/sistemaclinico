"use server";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { Empleado } from "./type"; // Asegúrate de que `EmployeeImportDto` contenga todos los campos importados del Excel

/**
 * Obtiene todos los empleados con datos de puesto y jefe
 */
export async function getEmpleados(): Promise<Empleado[]> {
  const records = await prisma.empleados.findMany({
    include: {
      Usuarios: true,
      Puesto: true
    },
  });

  return records.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    apellido: r.apellido,
    correo: r.correo,
    fechaNacimiento: r.FechaNacimiento ?? new Date(0),
    fechaIngreso: r.fechaIngreso ?? new Date(0),
    numeroIdentificacion: r.numeroIdentificacion,
    telefono: r.telefono ?? "",
    genero: r.genero ?? "",
    activo: r.activo,
    usuario: r.Usuarios?.usuario ?? "Sin Usuario",
    puesto_id: r.puesto_id,puesto: r.Puesto.Nombre,
  }));
}

/**
 * Empleados sin usuario asignado
 */
export async function getEmpleadosSinUsuario(): Promise<Empleado[]> {
  const records = await prisma.empleados.findMany({
    where: { Usuarios: null },
    include: { Puesto: true },
  });
  return records.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    apellido: r.apellido,
    correo: r.correo,
    fechaNacimiento: r.FechaNacimiento ?? new Date(0),
    fechaIngreso: r.fechaIngreso ?? new Date(0),
    numeroIdentificacion: r.numeroIdentificacion,
    telefono: r.telefono ?? "",
    genero: r.genero ?? "",
    activo: r.activo,
    usuario: null,
    puesto_id: r.puesto_id,
    puesto: r.Puesto.Nombre,
  }));
}

/**
 * Obtener un empleado por ID
 */
export async function getEmpleadoById(id: string): Promise<Empleado | null> {
  const r = await prisma.empleados.findUnique({
    where: { id },
    include: {
      Puesto: true,
      Usuarios: true,
    },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    apellido: r.apellido,
    correo: r.correo,
    fechaNacimiento: r.FechaNacimiento ?? new Date(0),
    fechaIngreso: r.fechaIngreso ?? new Date(0),
    numeroIdentificacion: r.numeroIdentificacion,
    telefono: r.telefono ?? "",
    genero: r.genero ?? "",
    activo: r.activo,
    usuario: r.Usuarios?.usuario ?? null,
    puesto_id: r.puesto_id,puesto: r.Puesto.Nombre,
  };
}

/**
 * Crea un nuevo empleado
 */
export async function createEmpleado(data: Empleado): Promise<Empleado> {
  const id = randomUUID();
  const r = await prisma.empleados.create({
    data: {
      id,
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      FechaNacimiento: data.fechaNacimiento,
      fechaIngreso: data.fechaIngreso,
      numeroIdentificacion: data.numeroIdentificacion,
      telefono: data.telefono,
      genero: data.genero,
      activo: data.activo ?? true,
      puesto_id: data.puesto_id,
    },
  });
  return getEmpleadoById(r.id) as Promise<Empleado>;
}

/**
 * Actualiza un empleado existente
 */
export async function updateEmpleado(
  id: string,
  data: Partial<Empleado>
): Promise<Empleado | null> {
  const r = await prisma.empleados.update({
    where: { id },
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      FechaNacimiento: data.fechaNacimiento,
      fechaIngreso: data.fechaIngreso,
      numeroIdentificacion: data.numeroIdentificacion,
      telefono: data.telefono,
      genero: data.genero,
      activo: data.activo,
      puesto_id: data.puesto_id,
    },
  });
  return getEmpleadoById(r.id);
}

/**
 * Acción para importar puestos y empleados desde un array de datos del Excel.
 * Si el puesto ya existe, solo devuelve su id; si no, crea uno nuevo.
 * Para cada fila, crea el empleado mapeando todos los campos necesarios.
 */

