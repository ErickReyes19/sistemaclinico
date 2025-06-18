import { getSession, getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { ServicioFormulario } from "../components/Form"; // Asegúrate de que el formulario sea para Empleados


export default async function Create() {
  const permisos = await getSessionPermisos();
  const sesion = await getSession();

  // Redirige si no hay sesión
  if (!sesion) {
    redirect("/login");
  }

  // Verifica permisos para crear empleados
  if (!permisos?.includes("crear_servicios")) {
    return <NoAcceso />;
  }



  const initialData = {
    id: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    activo: true,
  };


  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un nuevo servicio."
        screenName="Crear servicio" // Cambié la pantalla a "Crear Empleado"
      />
      <ServicioFormulario
        isUpdate={false} // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData} // Datos iniciales para crear un nuevo empleado
      />
    </div>
  );
}
