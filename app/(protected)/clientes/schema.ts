import * as z from "zod";

export const ClienteSchema = z.object({
  id: z.string().optional(), // Ahora obligatorio y debe ser UUID
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  correo: z.string().email("Correo no válido"),

  telefono: z
    .string()
    .min(1, "El teléfono es requerido")
    .regex(/^[0-9\-+() ]+$/, "Formato de teléfono inválido"),

  fechaNacimiento: z
    .date({
      required_error: "La fecha de nacimiento es requerida",
      invalid_type_error: "La fecha de nacimiento debe ser una fecha válida",
    })
    .refine((d) => d <= new Date(), "La fecha de nacimiento no puede ser futura"),

  genero: z.string().min(1, "El género es requerido"),
  numeroIdentificacion: z.string().min(1, "La identificación es requerida"),
  
  direccion: z.string().min(1, "La direccion es requerida"),

  activo: z.boolean(),

});

export type Cliente = z.infer<typeof ClienteSchema>;
