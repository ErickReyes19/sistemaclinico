
"use server";
import { prisma } from "@/lib/prisma"; // Asegúrate de importar correctamente tu cliente de Prisma
import { randomUUID } from "crypto";
import { PermisosRol, Rol as RolDTO } from "./type";

export async function getRolesPermisos(): Promise<RolDTO[]> {
  try {
    const roles = await prisma.rol.findMany({
      include: {
        permisos: {
          include: {
            permiso: true,
          },
        },
      },
    });

    // Mapear al DTO
    return roles.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      descripcion: r.descripcion,
      activo: r.activo,
      permisos: r.permisos.map((rp): PermisosRol => ({
        id: rp.permiso.id,
        nombre: rp.permiso.nombre,
      })),
    }));
  } catch (error) {
    console.error("Error al obtener los roles y permisos:", error);
    return [];
  }
}

export async function getRolesPermisosActivos(): Promise<RolDTO[]> {
  try {
    const roles = await prisma.rol.findMany({
      include: {
        permisos: {
          include: {
            permiso: true,
          },
        },
      },
    });

    // Mapear al DTO
    return roles.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      descripcion: r.descripcion,
      activo: r.activo,
      permisos: r.permisos.map((rp): PermisosRol => ({
        id: rp.permiso.id,
        nombre: rp.permiso.nombre,
      })),
    }));
  } catch (error) {
    console.error("Error al obtener los roles y permisos:", error);
    return [];
  }
}

export async function putRol({ rol }: { rol: RolDTO }): Promise<RolDTO | null> {
  // Preparamos los nuevos permisos para crear las filas intermedias
  const permisosCreate = rol.permisos.map((p: PermisosRol) => ({
    permiso: { connect: { id: p.id } },
  }));

  try {
    const updated = await prisma.rol.update({
      where: { id: rol.id! },
      data: {
        nombre: rol.nombre,
        descripcion: rol.descripcion,
        activo: rol.activo ?? true,
        permisos: {
          // 1) Eliminamos todas las filas RolPermiso existentes
          deleteMany: {},
          // 2) Creamos las nuevas relaciones
          create: permisosCreate,
        },
      },
      include: {
        permisos: {
          include: {
            permiso: true,
          },
        },
      },
    });

    // Mapear la respuesta de Prisma a tu DTO
    return {
      id: updated.id,
      nombre: updated.nombre,
      descripcion: updated.descripcion,
      activo: updated.activo,
      permisos: updated.permisos.map((rp) => ({
        id: rp.permiso.id,
        nombre: rp.permiso.nombre,
      })),
    };
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    return null;
  }
}



export async function getRolPermisoById(id: string): Promise<RolDTO | null> {
  try {
    const rol = await prisma.rol.findUnique({
      where: { id },
      include: {
        permisos: {
          include: {
            permiso: true,
          },
        },
      },
    });

    if (!rol) {
      return null;
    }

    return {
      id: rol.id,
      nombre: rol.nombre,
      descripcion: rol.descripcion,
      activo: rol.activo,
      permisos: rol.permisos.map((rp): PermisosRol => ({
        id: rp.permiso.id,
        nombre: rp.permiso.nombre,
      })),
    };
  } catch (error) {
    console.error("Error al obtener el rol por ID:", error);
    return null;
  }
}


export async function postRol({ rol }: { rol: RolDTO; }): Promise<RolDTO> {
  // Verificar si el rol ya existe
  const existente = await prisma.rol.findUnique({
    where: { nombre: rol.nombre.trim() },
    include: {
      permisos: { include: { permiso: true } }
    }
  });
  if (existente) {
    // Puedes devolver el existente o lanzar error
    return {
      id: existente.id,
      nombre: existente.nombre,
      descripcion: existente.descripcion,
      activo: existente.activo,
      permisos: existente.permisos.map(rp => ({
        id: rp.permiso.id,
        nombre: rp.permiso.nombre
      }))
    };
  }

  try {
    const created = await prisma.rol.create({
      data: {
        id: randomUUID(),
        nombre: rol.nombre.trim(),
        descripcion: rol.descripcion,
        activo: rol.activo ?? true,
        permisos: {
          create: rol.permisos.map((p: PermisosRol) => ({
            // Generar nuevo id para la relación
            id: randomUUID(),
            permiso: { connect: { id: p.id } }
          })),
        },
      },
      include: {
        permisos: { include: { permiso: true } }
      },
    });

    return {
      id: created.id,
      nombre: created.nombre,
      descripcion: created.descripcion,
      activo: created.activo,
      permisos: created.permisos.map(rp => ({
        id: rp.permiso.id,
        nombre: rp.permiso.nombre
      })),
    };
  } catch (error) {
    console.error('Error al crear el rol:', error);
    throw error;
  }
}