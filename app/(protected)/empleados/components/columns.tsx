"use client";
import { ArrowUpDown, CheckCircleIcon, UserX } from "lucide-react";
// import { FormateadorFecha } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, XCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Empleado } from "../type";
import { calcularEdad } from "@/lib/utils";

export const columns: ColumnDef<Empleado>[] = [

  {
    accessorKey: "nombre", // La columna principal, que será 'nombre'
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      // Concatenar 'nombre' y 'apellido' usando row.original
      const nombre = row.original.nombre || "";
      const apellido = row.original.apellido || ""; // Acceder al apellido desde row.original
      const nombreCompleto = `${nombre} ${apellido}`.trim(); // Concatenar y eliminar espacios extras
      return nombreCompleto; // Mostrar el nombre completo
    },
  },
  {
    accessorKey: "fechaNacimiento",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-center"
      >
        Edad
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const fechaNacimiento = row.original.fechaNacimiento as Date | string;

      // Si viene como string la convierto a Date
      const fecha = typeof fechaNacimiento === "string" ? new Date(fechaNacimiento) : fechaNacimiento;

      const edad = calcularEdad(fecha);

      // Formatear fecha
      const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      return (
        <div className="text-center">
          {fechaFormateada} ({edad} años)
        </div>
      );
    },
  },
  {
    accessorKey: "usuario",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Usuario
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const usuario = row.getValue("usuario");
      return usuario ? usuario : <UserX className="text-gray-500 w-5 h-5" />;
    },
  },
  {
    accessorKey: "puesto",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Puesto
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "genero",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Genero
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "activo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Activo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const isActive = row.getValue("activo");
      return (
        <div className="">
          {isActive ? (
            <div className="flex gap-2">
              <CheckCircleIcon color="green" /> Activo{" "}
            </div>
          ) : (
            <div className="flex gap-2">
              <XCircleIcon color="red" /> Inactivo{" "}
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const empleado = row.original;
      console.log("🚀 ~ empleado:", empleado)

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <Link href={`/empleados/${empleado.id}/edit`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
