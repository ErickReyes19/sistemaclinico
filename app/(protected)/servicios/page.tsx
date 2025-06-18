import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
// import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
// import Link from "next/link";
import { getServiciosClinicos } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import EmployeeListMobile from "./components/servicios-list-mobile";

export default async function Empleados() {

  const permisos = await getSessionPermisos();

  const data = await getServiciosClinicos();

  if (!permisos?.includes("ver_servicios")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={Stethoscope}
        description="En este apartado podrá ver todos los servicios"
        screenName="Servicios clinicos" 
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <EmployeeListMobile servicios={data} />
      </div>
    </div>
  );
}
