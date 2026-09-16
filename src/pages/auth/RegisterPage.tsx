import CardFooterAuth from "@/components/CardFooterAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useAuthActions } from "@/hooks/useAuthActions";

import {
  registerZodSchema,
  type registerZodSchemaType,
} from "@/lib/zod.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterPage = () => {
  const { loading, register } = useAuthActions();

  const form = useForm<registerZodSchemaType>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: registerZodSchemaType) => {
    const response = await register(data);
    if (response.error) {
      toast.error("Problema al crear la cuenta");
      console.log(response.error.code);
      if (response.error.code == "auth/email-already-in-use") {
        form.setError("email", {
          type: "manual",
          message: "Email en uso",
        });
      } else {
        console.log("Registration error:", response.error);
      }
    } else {
      console.log("Registration successful", data);
    }
  };

  return (
    <>
      <Card className="bg-green-300">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Registrate en tu cuenta usando el email y la cotraseña o con la
            cuenta de google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Controller
              name="displayName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nombre de cuenta</FieldLabel>
                  <Input placeholder="Ingresa un nombre de cuenta" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input placeholder="Ingresa tu email" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Contraseña</FieldLabel>
                  <Input
                    type="password"
                    placeholder="Ingresa una contraseña"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Confirmar contraseña</FieldLabel>
                  <Input
                    type="password"
                    placeholder="Confirma la contraseña"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "creado cuenta..." : "Registrarse"}
            </Button>
          </form>
        </CardContent>
        <CardFooterAuth type="register" loading={loading} />
      </Card>
    </>
  );
};

export default RegisterPage;
