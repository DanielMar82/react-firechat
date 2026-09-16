import { useProfileActions } from "@/hooks/useProfileActions";
import { profileZodSchema, type profileZodSchemaType } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { User } from "firebase/auth";
import { toast } from "sonner";

interface Props {
  user: User;
}

const FormProfile = ({ user }: Props) => {
  const { loading, updateUserProfile } = useProfileActions();

  const form = useForm<profileZodSchemaType>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || undefined,
    },
  });

  async function onSubmit(values: profileZodSchemaType) {
    const result = await updateUserProfile(values);
    if (result.success) {
      return toast.success("Perfil actualizado correctamente");
    }
    toast.error("Error al actualizar el perfil");
  }

  return (
    <>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="displayName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nombre de cuenta</FieldLabel>
              <Input
                className="bg-white"
                placeholder="Ingrese un nuevo nombre"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="photoURL"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Foto de perfil</FieldLabel>
              <Input
                className="bg-white"
                placeholder="https://example.com/photo.jpg"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button className="" type="submit" disabled={loading}>
          {loading ? "actualizando perfil..." : "Actualizar perfil"}
        </Button>
      </form>
    </>
  );
};

export default FormProfile;
