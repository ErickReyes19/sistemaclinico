// types.ts



export type Cliente = {
    id?: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono?: string;
    fechaNacimiento: Date;
    genero: string;
    numeroIdentificacion: string;
    direccion: string;
    activo: boolean;
};


