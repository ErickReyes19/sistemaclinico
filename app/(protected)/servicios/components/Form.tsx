"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { z } from "zod";
import { createServicioClinico, updateServicioClinico } from "../actions";
import { ServicioClinicoSchema } from "../schema";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ServicioFormulario({
  isUpdate,
  initialData,
}: {
  isUpdate: boolean;
  initialData?: z.infer<typeof ServicioClinicoSchema>;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof ServicioClinicoSchema>>({
    resolver: zodResolver(ServicioClinicoSchema),
    defaultValues: initialData || {},
  });

  // const { formState } = form;

  //forma de saber si un form esta valido o no
  // const isValid = formState.errors;
  // console.log("isValid");
  // console.log(isValid);
  async function onSubmit(data: z.infer<typeof ServicioClinicoSchema>) {
    // Verificación de validez antes del submit
    const servicioClinicoData = {
      id: initialData?.id,
      servicioClinico: data,
    };

    const promise = async () => {
      if (isUpdate) {
        await updateServicioClinico(servicioClinicoData.id!, servicioClinicoData.servicioClinico);
        return { name: "Actualización" };
      } else {
        await createServicioClinico(servicioClinicoData.servicioClinico);
        return { name: "Creación" };
      }
    };

    try {
      await toast.promise(promise, {
        loading: "Guardando...",
        success: (data) => `${data.name} exitosa`,
        error: "Error al guardar el rol",
      });

      router.push("/servicios");
      router.refresh();
    } catch (error) {
      console.error("Error en la operación:", error);
      toast.error("Error al Guardar", {
        description: isUpdate
          ? "No se pudo actualizar el servicio."
          : "No se pudo crear el servicio."
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
                  <Input placeholder="Ingresa el nombre" {...field} />
                </FormControl>
                <FormDescription>Por favor ingresa el nombre del servicio.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* descripción */}
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa la descripción" {...field} />
                </FormControl>
                <FormDescription>Por favor ingresa la descripción.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  



          {/* Precio */}
          <FormField
            control={form.control}
            name="precio"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. 300"
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                  />
                </FormControl>
                <FormDescription>Precio del servicio.</FormDescription>
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
