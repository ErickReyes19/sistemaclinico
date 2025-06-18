import * as z from "zod";

export const ServicioClinicoSchema = z.object({
  id: z.string().optional(), // Ahora obligatorio y debe ser UUID
  nombre: z.string().min(1, "El nombre es requerido"),
  precio : z.number().min(0, "El precio debe ser un número positivo"),
  descripcion: z.string().optional(),
  activo: z.boolean(),

});

export type ServicioClinico = z.infer<typeof ServicioClinicoSchema>;
