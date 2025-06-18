"use server";

import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { ServicioClinico } from "./type"; // Asegúrate de que `EmployeeImportDto` contenga todos los campos importados del Excel

/**
 * Obtiene todos los empleados con datos de puesto y jefe
 */
export async function getServiciosClinicos(): Promise<ServicioClinico[]> {
  const records = await prisma.servicioClinico.findMany();

  return records.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    precio: Number(r.precio),
    descripcion: r.descripcion ?? "",
  }));
}
export async function getServiciosClinicosActivos(): Promise<ServicioClinico[]> {
  const records = await prisma.servicioClinico.findMany({
    where: { activo: true },
  });

  return records.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    precio: Number(r.precio),
    descripcion: r.descripcion ?? "",
  }));
}

/**
 * Empleados sin usuario asignado
 */


/**
 * Obtener un empleado por ID
 */
export async function getServicioClinicoById(id: string): Promise<ServicioClinico | null> {
  const r = await prisma.servicioClinico.findUnique({
    where: { id },
  });
  if (!r) return null;
  return {
    id: r.id,
    nombre: r.nombre,
    activo: r.activo,
    precio: Number(r.precio),
    descripcion: r.descripcion ?? "",
  };
}

/**
 * Crea un nuevo empleado
 */
export async function createServicioClinico(data: ServicioClinico): Promise<ServicioClinico> {
  const id = randomUUID();
  const r = await prisma.servicioClinico.create({
    data: {
      id,
      nombre: data.nombre,
      activo: data.activo ?? true,
      precio: data.precio,
      descripcion: data.descripcion ?? "",

    },
  });
  return getServicioClinicoById(r.id) as Promise<ServicioClinico>;
}

/**
 * Actualiza un empleado existente
 */
export async function updateServicioClinico(
  id: string,
  data: Partial<ServicioClinico>
): Promise<ServicioClinico | null> {
  const r = await prisma.servicioClinico.update({
    where: { id },
    data: {
      nombre: data.nombre,
      activo: data.activo,
      precio: data.precio,
      descripcion: data.descripcion ?? "",
      
    },
  });
  return getServicioClinicoById(r.id);
}

/**
 * Acción para importar puestos y empleados desde un array de datos del Excel.
 * Si el puesto ya existe, solo devuelve su id; si no, crea uno nuevo.
 * Para cada fila, crea el empleado mapeando todos los campos necesarios.
 */

