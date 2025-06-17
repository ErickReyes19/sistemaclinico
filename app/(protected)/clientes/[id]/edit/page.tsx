

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getClienteById } from "../../actions";
import { ClienteFormulario } from "../../components/Form";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa

  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_clientes")) {
    return <NoAcceso />;
  }


  // Obtener el cliente por getEmpleadoById ID
  const cliente = await getClienteById(params.id);
  if (!cliente) {
    redirect("/clientes"); // Redirige si no se encuentra el cliente
  }
  const initialData = {
    id: cliente.id || "",
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    correo: cliente.correo,
    genero: cliente.genero, // Valor por defecto
    activo: cliente.activo ?? false,
    fechaNacimiento: new Date(cliente.fechaNacimiento),
    numeroIdentificacion: cliente.numeroIdentificacion || "",
    telefono: cliente.telefono || "",
    direccion: cliente.direccion || "",

  };

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un empleado"
        screenName="Editar Empleado"
      />
      <ClienteFormulario
        isUpdate={true} // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData} // Datos iniciales para crear un nuevo empleado
      />

    </div>
  );
}
