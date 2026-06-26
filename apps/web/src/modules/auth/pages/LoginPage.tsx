import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { AuthShell } from "../../../components/auth/AuthShell";
import { RoleSelector } from "../../../components/auth/RoleSelector";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { roleDashboardPath } from "../../../contexts/AuthContext";
import { useAuth } from "../../../hooks/useAuth";
import type { UserRole } from "../../../types/auth";
import { parseRoleParam, roleLabel } from "../utils/role";

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo valido."),
  password: z.string().min(6, "La contrasena debe tener al menos 6 caracteres."),
  role: z.enum(["CLIENT", "SELLER"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function safeRedirect(value: string | null, role: UserRole) {
  if (value?.startsWith("/")) {
    return value;
  }

  return roleDashboardPath(role);
}

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const initialRole = parseRoleParam(searchParams.get("role"));

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      role: initialRole,
    },
    resolver: zodResolver(loginSchema),
  });

  const selectedRole = watch("role");

  function handleRoleChange(role: Extract<UserRole, "CLIENT" | "SELLER">) {
    setValue("role", role, { shouldDirty: true, shouldValidate: true });
  }

  async function onSubmit(values: LoginFormValues) {
    login({ email: values.email, role: values.role });
    navigate(safeRedirect(searchParams.get("from"), values.role));
  }

  return (
    <AuthShell
      eyebrow="Iniciar sesion"
      subtitle="Accede como cliente para descubrir puestos certificados o como vendedor para administrar tu presencia en MarTrust."
      title={`Bienvenido de nuevo, ${roleLabel(selectedRole)}`}
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <RoleSelector onChange={handleRoleChange} value={selectedRole} />

        <Input
          autoComplete="email"
          error={errors.email?.message}
          icon={<Mail aria-hidden="true" size={17} />}
          id="email"
          label="Correo electronico"
          placeholder="tu@email.com"
          type="email"
          {...register("email")}
        />

        <Input
          autoComplete="current-password"
          error={errors.password?.message}
          icon={<LockKeyhole aria-hidden="true" size={17} />}
          id="password"
          label="Contrasena"
          placeholder="Minimo 6 caracteres"
          type="password"
          {...register("password")}
        />

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 text-slate-600">
            <input className="h-4 w-4 rounded border-slate-300 text-trust-sea" type="checkbox" />
            Recordarme
          </label>
          <Link className="font-semibold text-trust-sea hover:text-trust-ink" to="/forgot-password">
            Recuperar contrasena
          </Link>
        </div>

        <Button className="w-full" isLoading={isSubmitting} type="submit">
          Entrar a MarTrust
          <ArrowRight aria-hidden="true" size={17} />
        </Button>

        <p className="text-center text-sm text-slate-600">
          ¿Aun no tienes cuenta?{" "}
          <Link className="font-semibold text-trust-sea hover:text-trust-ink" to={`/register?role=${roleLabel(selectedRole)}`}>
            Crear cuenta
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
