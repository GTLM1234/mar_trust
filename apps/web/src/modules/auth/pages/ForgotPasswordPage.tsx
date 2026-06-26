import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { AuthShell } from "../../../components/auth/AuthShell";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

const forgotPasswordSchema = z.object({
  email: z.string().email("Ingresa un correo valido."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit() {
    setIsSent(true);
  }

  return (
    <AuthShell
      eyebrow="Recuperar acceso"
      subtitle="Te enviaremos instrucciones cuando el backend de autenticacion este conectado."
      title="Recupera tu contrasena"
    >
      {isSent ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 aria-hidden="true" size={18} />
            Solicitud registrada
          </div>
          <p className="mt-2 text-sm leading-6">
            Cuando FastAPI tenga el endpoint activo, este flujo enviara el correo
            de recuperacion de manera segura.
          </p>
          <Link className="mt-4 inline-flex text-sm font-semibold text-trust-sea" to="/login">
            Volver al login
          </Link>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            autoComplete="email"
            error={errors.email?.message}
            icon={<Mail aria-hidden="true" size={17} />}
            id="forgot-email"
            label="Correo electronico"
            placeholder="tu@email.com"
            type="email"
            {...register("email")}
          />
          <Button className="w-full" isLoading={isSubmitting} type="submit">
            Enviar instrucciones
          </Button>
          <p className="text-center text-sm text-slate-600">
            <Link className="font-semibold text-trust-sea hover:text-trust-ink" to="/login">
              Volver al login
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
