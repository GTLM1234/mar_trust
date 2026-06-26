import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
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

const registerSchema = z
  .object({
    name: z.string().min(3, "Ingresa tu nombre completo."),
    email: z.string().email("Ingresa un correo valido."),
    phone: z.string().min(7, "Ingresa un telefono valido."),
    password: z.string().min(8, "Usa al menos 8 caracteres."),
    confirmPassword: z.string().min(8, "Confirma tu contrasena."),
    role: z.enum(["CLIENT", "SELLER"]),
    terms: z.boolean().refine((value) => value, "Acepta los terminos para continuar."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Las contrasenas no coinciden.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register: createSession } = useAuth();
  const initialRole = parseRoleParam(searchParams.get("role"));

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
      phone: "",
      role: initialRole,
      terms: false,
    },
    resolver: zodResolver(registerSchema),
  });

  const selectedRole = watch("role");

  function handleRoleChange(role: Extract<UserRole, "CLIENT" | "SELLER">) {
    setValue("role", role, { shouldDirty: true, shouldValidate: true });
  }

  async function onSubmit(values: RegisterFormValues) {
    createSession({ email: values.email, name: values.name, role: values.role });
    navigate(roleDashboardPath(values.role));
  }

  return (
    <AuthShell
      eyebrow="Crear cuenta"
      subtitle="Elige el perfil correcto desde el inicio. Luego cada rol vera solo las pantallas permitidas."
      title={`Registro de ${roleLabel(selectedRole)}`}
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <RoleSelector onChange={handleRoleChange} value={selectedRole} />

        <Input
          autoComplete="name"
          error={errors.name?.message}
          icon={<UserRound aria-hidden="true" size={17} />}
          id="name"
          label="Nombre completo"
          placeholder={selectedRole === "SELLER" ? "Nombre del responsable" : "Tu nombre"}
          type="text"
          {...register("name")}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            autoComplete="email"
            error={errors.email?.message}
            icon={<Mail aria-hidden="true" size={17} />}
            id="register-email"
            label="Correo"
            placeholder="tu@email.com"
            type="email"
            {...register("email")}
          />
          <Input
            autoComplete="tel"
            error={errors.phone?.message}
            icon={<Phone aria-hidden="true" size={17} />}
            id="phone"
            label="Telefono"
            placeholder="+51 999 999 999"
            type="tel"
            {...register("phone")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            autoComplete="new-password"
            error={errors.password?.message}
            icon={<LockKeyhole aria-hidden="true" size={17} />}
            id="register-password"
            label="Contrasena"
            placeholder="Minimo 8 caracteres"
            type="password"
            {...register("password")}
          />
          <Input
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            icon={<LockKeyhole aria-hidden="true" size={17} />}
            id="confirm-password"
            label="Confirmar"
            placeholder="Repite tu contrasena"
            type="password"
            {...register("confirmPassword")}
          />
        </div>

        <label className="block text-sm text-slate-600">
          <span className="flex items-start gap-2">
            <input className="mt-1 h-4 w-4 rounded border-slate-300 text-trust-sea" type="checkbox" {...register("terms")} />
            <span>Acepto los terminos y el tratamiento de datos para operar MarTrust.</span>
          </span>
          {errors.terms?.message ? (
            <span className="mt-1 block text-xs text-rose-600">{errors.terms.message}</span>
          ) : null}
        </label>

        <Button className="w-full" isLoading={isSubmitting} type="submit">
          Crear cuenta
          <ArrowRight aria-hidden="true" size={17} />
        </Button>

        <p className="text-center text-sm text-slate-600">
          ¿Ya tienes cuenta?{" "}
          <Link className="font-semibold text-trust-sea hover:text-trust-ink" to={`/login?role=${roleLabel(selectedRole)}`}>
            Iniciar sesion
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
