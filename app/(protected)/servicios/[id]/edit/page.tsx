

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getServicioClinicoById } from "../../actions";
import { ServicioFormulario } from "../../components/Form";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa

  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_servicios")) {
    return <NoAcceso />;
  }


  // Obtener el servicio por getServicioClinicoById ID
  const servicio = await getServicioClinicoById(params.id);
  if (!servicio) {
    redirect("/servicios"); // Redirige si no se encuentra el servicio
  }
  const initialData = {
    id: servicio.id || "",
    nombre: servicio.nombre,
    descripcion: servicio.descripcion || "",
    precio: servicio.precio || 0,
    activo: servicio.activo || true,

  };

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un servicio."
        screenName="Editar servicio clínico" // Cambié la pantalla a "Editar Servicio"
      />
      <ServicioFormulario
        isUpdate={true} // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData} // Datos iniciales para crear un nuevo empleado
      />

    </div>
  );
}
