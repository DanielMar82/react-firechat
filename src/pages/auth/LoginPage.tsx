import CardFooterAuth from "@/components/CardFooterAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useAuthActions } from "@/hooks/useAuthActions";

import { loginZodSchema, type loginZodSchemaType } from "@/lib/zod.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginPage = () => {
  const { loading, login } = useAuthActions();

  const form = useForm<loginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: loginZodSchemaType) => {
    const response = await login(data);
    if (!response.success) {
      console.log(response);

      if (response.error) {
        form.setError("email", {
          type: "manual",
          message: "Email o contraseña invalidos",
        });
        form.setError("password", {
          type: "manual",
          message: "Email o contraseña invalidos",
        });
        toast.error("Email o contraseña invalidos");
      }
    }
  };

  return (
    <>
      <Card className="bg-blue-300">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Inicia sesión en tu cuenta usando el email y la cotraseña o con la
            cuenta de google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    type="password"
                    placeholder="Ingresa la contraseña"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "loggin in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooterAuth type="login" loading={loading} />
      </Card>
    </>
  );
};

export default LoginPage;
