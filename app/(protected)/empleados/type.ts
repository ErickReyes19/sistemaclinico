// types.ts

export interface EmployeeImportDto {
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;

    // Las fechas que vienen del Excel las puedes recibir como ISO string (por ejemplo "1999-12-02")
    fechaNacimiento: string; // formato ISO, p. ej. "1999-12-02"
    fechaIngreso: string; // formato ISO, p. ej. "2023-01-01"

    telefono: string;
    email: string;
 // opcional, si el Excel no trae este campo
    genero: string;
    activo?: boolean; // opcional, puedes asignar un default en la acción


}

// Ya que antes te habíamos definido un type Empleado (para las respuestas de la API),
// podrías añadirlo aquí o separarlo en otro archivo. Por ejemplo:

export type Empleado = {
    id?: string;
    nombre: string;
    apellido: string;
    correo: string;
    fechaNacimiento: Date;
    fechaIngreso?: Date;
    numeroIdentificacion: string;
    telefono?: string;
    genero: string;
    activo?: boolean;
    usuario?: string | null;
    puesto_id: string;
    puesto?: string;
};


export interface EmployeeDto {
    identidad: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string; // "YYYY-MM-DD"
    genero: string;
    telefono: string;
    email: string;
    fechaIngreso: string;       // puesto
}
