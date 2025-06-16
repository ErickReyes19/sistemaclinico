

export interface Employee {
  id: string;
  numeroIdentificacion: string;

  nombre: string;
  apellido: string;
  correo: string;

  fechaNacimiento: Date;
  fechaIngreso: Date;

  telefono: string;

  genero: string;
  activo: boolean;

  usuario_id: string;
  usuario?: string;

  puesto_id: string;
  puesto?: string;


  createAt: Date;
  updateAt: Date;
}
