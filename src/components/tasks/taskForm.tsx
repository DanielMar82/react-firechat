import { taskZodSchema, type taskZodSchemaType } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useTaskActions } from "@/hooks/useTaskActions";
import { toast } from "sonner";

const TaskForm = () => {
  const [isPending, startTransition] = useTransition();

  const { createTask } = useTaskActions();

  const form = useForm<taskZodSchemaType>({
    resolver: zodResolver(taskZodSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: taskZodSchemaType) {
    startTransition(async () => {
      try {
        await createTask(values);
        form.reset();
      } catch (error) {
        console.log(error);
        toast.error("Error al crear la tarea");
      }
    });
  }

  return (
    <>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Título de la tarea</FieldLabel>
              <Input
                className="bg-white"
                placeholder="Ingrese un título"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Descripción de la tarea</FieldLabel>
              <Input
                className="bg-white"
                placeholder="Ingrese una descripción"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button disabled={isPending} type="submit">
          Añadir
        </Button>
      </form>
    </>
  );
};

export default TaskForm;
