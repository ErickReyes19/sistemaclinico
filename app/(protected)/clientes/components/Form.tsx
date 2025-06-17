"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";

import { z } from "zod";
import { createCliente, updateCliente } from "../actions";
import { ClienteSchema } from "../schema";
import { toast } from "sonner";

export function ClienteFormulario({
  isUpdate,
  initialData,
}: {
  isUpdate: boolean;
  initialData?: z.infer<typeof ClienteSchema>;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof ClienteSchema>>({
    resolver: zodResolver(ClienteSchema),
    defaultValues: initialData || {},
  });

  // const { formState } = form;

  //forma de saber si un form esta valido o no
  // const isValid = formState.errors;
  // console.log("isValid");
  // console.log(isValid);
  async function onSubmit(data: z.infer<typeof ClienteSchema>) {
    // Verificación de validez antes del submit
    const clienteData = {
      id: initialData?.id,
      cliente: data,
    };

    const promise = async () => {
      if (isUpdate) {
        await updateCliente(clienteData.id!, clienteData.cliente);
        return { name: "Actualización" };
      } else {
        await createCliente(clienteData.cliente);
        return { name: "Creación" };
      }
    };

    try {
      await toast.promise(promise, {
        loading: "Guardando...",
        success: (data) => `${data.name} exitosa`,
        error: "Error al guardar el rol",
      });

      router.push("/clientes");
      router.refresh();
    } catch (error) {
      console.error("Error en la operación:", error);
      toast.error("Error al Guardar", {
        description: isUpdate
          ? "No se pudo actualizar el cliente."
          : "No se pudo crear el cliente."
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border rounded-md p-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nombre */}
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu nombre" {...field} />
                </FormControl>
                <FormDescription>Por favor ingresa tu nombre completo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Apellido */}
          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu apellido" {...field} />
                </FormControl>
                <FormDescription>Por favor ingresa tu apellido.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Número de Identificación */}
          <FormField
            control={form.control}
            name="numeroIdentificacion"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Número de Identificación</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. 0801-1999-00001"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Documento o cédula del empleado.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Correo */}
          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Ingresa tu correo" {...field} />
                </FormControl>
                <FormDescription>Debe ser un correo válido.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fecha de Nacimiento */}
          <FormField
            control={form.control}
            name="fechaNacimiento"
            render={({ field }) => (
              <FormItem className="flex flex-col col-span-1">
                <FormLabel>Fecha de nacimiento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Fecha de nacimiento del empleado.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />



          {/* Teléfono */}
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. 9999-9999" {...field} />
                </FormControl>
                <FormDescription>Número de teléfono móvil o fijo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* dirección */}
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Barrio La libertad" {...field} />
                </FormControl>
                <FormDescription>Dirección de cliente.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />




          {/* Género */}
          <FormField
            control={form.control}
            name="genero"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Género</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Femenino">Femenino</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Indica tu género.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        {/* Estado Activo (solo actualización) */}
        {isUpdate && (
          <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Activo</SelectItem>
                      <SelectItem value="false">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Define si el empleado está activo o inactivo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Botón Enviar */}
        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : isUpdate ? (
              "Actualizar"
            ) : (
              "Crear"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
