import { z } from "zod";

// SCHEMA DE LOGIN
export const loginZodSchema = z.object({
  email: z.string().trim().pipe(z.email("Formato de email invalido")),
  password: z
    .string()
    .min(6, "La contraseña tiene que tener mínimo 6 caracteres"),
});

export type loginZodSchemaType = z.infer<typeof loginZodSchema>;

// SCHEMA DE REGISTRO
export const registerZodSchema = z
  .object({
    email: z.string().trim().pipe(z.email("Formato de email invalido")),
    displayName: z
      .string()
      .min(1, "El nombre de cuenta es necesario")
      .max(
        50,
        "El nombre de cuenta tiene que tener como mñaximo 50 caracteres",
      ),
    password: z
      .string()
      .min(6, "La contraseña tiene que tener mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La contraseña tiene que tener mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type registerZodSchemaType = z.infer<typeof registerZodSchema>;

// SCHEMA PROFILE
export const profileZodSchema = z.object({
  displayName: z
    .string()
    .min(1, "Se necesita nombre de cuenta")
    .max(50, "El nombre de cuenta no puede superar los 50 caracteres"),
  photoURL: z
    .union([z.url("Formato de URL invalido"), z.literal("")])
    .optional(),
});

export type profileZodSchemaType = z.infer<typeof profileZodSchema>;

// SCHEMA TASK
export const taskZodSchema = z.object({
  title: z
    .string()
    .min(1, "Se necesita título")
    .max(100, "El título no puede pasar de los 100 caracteres"),
  description: z
    .string()
    .max(500, "La descripción no puede pasar de los 500 caracteres")
    .optional(),
});

export type taskZodSchemaType = z.infer<typeof taskZodSchema>;
