"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calcularEdad } from "@/lib/utils";
import { House, Mail, Pencil, Phone, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Cliente } from "../type";

interface ClienteListProps {
  clientes: Cliente[];
}

export default function EmployeeListMobile({ clientes: clientes }: ClienteListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono!.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Link href={`/clientes/create`} className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo cliente
          <Plus />
        </Button>
      </Link>
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {filteredClientes.map((cliente) => (
        <div
          key={cliente.id}
          className="flex items-center justify-between p-4 rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${cliente.activo ? "bg-green-500" : "bg-red-500"
                  }`}
              ></span>
              <h3 className="text-sm font-medium truncate">
                {cliente.nombre} {cliente.apellido}
              </h3>
            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                <span className="truncate">{cliente.correo}</span>
              </p>
              <p className="text-xs flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                <span className="truncate">{cliente.telefono}</span>
              </p>
              <p className="text-xs flex items-center">
                <User className="h-3 w-3 mr-1" />
                {calcularEdad(new Date(cliente.fechaNacimiento))} años, {cliente.genero}
              </p>

            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs flex items-center">
                <House className="h-3 w-3 mr-1" />
                <span className="truncate">{cliente.direccion}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/clientes/${cliente.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredClientes.length === 0 && (
        <p className="text-center text-gray-500">
          No se encontraron clientes.
        </p>
      )}
      {filteredClientes.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredClientes.length} de {clientes.length} clientes
        </p>
      )}
    </div>
  );
}
