"use server";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { Cliente } from "./type"; // Asegúrate de que `EmployeeImportDto` contenga todos los campos importados del Excel

/**
 * Obtiene todos los empleados con datos de puesto y jefe
 */
export async function getClientes(): Promise<Cliente[]> {
  const records = await prisma.cliente.findMany();

  return records.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    apellido: r.apellido,
    correo: r.correo ?? "",
    numeroIdentificacion: r.numeroIdentificacion,
    telefono: r.telefono ?? "",
    genero: r.genero ?? "",
    activo: r.activo,
    fechaNacimiento: r.fechaNacimiento ?? new Date(0),
    direccion: r.direccion ?? ""
  }));
}

/**
 * Empleados sin usuario asignado
 */


/**
 * Obtener un empleado por ID
 */
export async function getClienteById(id: string): Promise<Cliente | null> {
  const r = await prisma.cliente.findUnique({
    where: { id },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    apellido: r.apellido,
    correo: r.correo ?? "",
    fechaNacimiento: r.fechaNacimiento ?? new Date(0),
    numeroIdentificacion: r.numeroIdentificacion,
    telefono: r.telefono ?? "",
    genero: r.genero ?? "",
    activo: r.activo,
    direccion: r.direccion ?? ""
  };
}

/**
 * Crea un nuevo empleado
 */
export async function createCliente(data: Cliente): Promise<Cliente> {
  const id = randomUUID();
  const r = await prisma.cliente.create({
    data: {
      id,
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      fechaNacimiento: data.fechaNacimiento,
      numeroIdentificacion: data.numeroIdentificacion,
      telefono: data.telefono,
      genero: data.genero,
      activo: data.activo ?? true,
      direccion: data.direccion ?? "",

    },
  });
  return getClienteById(r.id) as Promise<Cliente>;
}

/**
 * Actualiza un empleado existente
 */
export async function updateCliente(
  id: string,
  data: Partial<Cliente>
): Promise<Cliente | null> {
  const r = await prisma.cliente.update({
    where: { id },
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      fechaNacimiento: data.fechaNacimiento,
      numeroIdentificacion: data.numeroIdentificacion,
      telefono: data.telefono,
      genero: data.genero,
      activo: data.activo,
      direccion: data.direccion,
      
    },
  });
  return getClienteById(r.id);
}

/**
 * Acción para importar puestos y empleados desde un array de datos del Excel.
 * Si el puesto ya existe, solo devuelve su id; si no, crea uno nuevo.
 * Para cada fila, crea el empleado mapeando todos los campos necesarios.
 */

