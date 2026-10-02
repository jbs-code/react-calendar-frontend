import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useForm } from "@/hooks/useForm";
import { useEffect, useTransition } from "react";

export interface RegisterFormProps {}

interface Register {
  registerName: string;
  registerEmail: string;
  registerPassword: string;
  registerPassword2: string;
}

export function RegisterForm(_props: RegisterFormProps) {
  const { formState, onInputChange } = useForm({
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPassword2: "",
  });

  const [isLoading, setTransition] = useTransition();

  const { errorMessage, errorSource, startRegister } = useAuthStore();

  useEffect(() => {
    if (errorMessage?.trim() && errorSource === "register") {
      toast.add({
        type: "error",
        title: errorMessage,
        timeout: 5000,
        data: { variant: "login-error" },
      });
    }
  }, [errorMessage, errorSource]);

  const { registerName, registerEmail, registerPassword, registerPassword2 } =
    formState as Register;

  const onSubmit = () => {
    if (registerPassword !== registerPassword2) {
      toast.add({
        type: "error",
        title: "Las contraseñas no coinciden",
        timeout: 5000,
        data: { variant: "login-error" },
      });
      return;
    }
    setTransition(() => {
      startRegister({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });
    });
  };

  return (
    <FieldSet className="w-full max-w-md bg-gray-200 text-stone-950 p-5 rounded-lg">
      <form action={onSubmit}>
        <FieldTitle>
          <h1 className="text-2xl font-bold">Registro</h1>
        </FieldTitle>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Nombre</FieldLabel>
            <Input
              className="border border-stone-950"
              id="name"
              type="text"
              name="registerName"
              value={registerName}
              onChange={onInputChange}
              placeholder="john.doe@example.com"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              className="border border-stone-950"
              id="email"
              type="email"
              name="registerEmail"
              value={registerEmail}
              onChange={onInputChange}
              placeholder="john.doe@example.com"
            />
            <FieldDescription>Ingresa un email válido</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <FieldDescription>
              Debe tener al menos 6 caracteres
            </FieldDescription>
            <Input
              className="border border-stone-950"
              id="password"
              type="password"
              name="registerPassword"
              value={registerPassword}
              onChange={onInputChange}
              placeholder="••••••••"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password2">Repita contraseña</FieldLabel>
            <Input
              className="border border-stone-950"
              id="password2"
              type="password"
              name="registerPassword2"
              value={registerPassword2}
              onChange={onInputChange}
              placeholder="••••••••"
            />
          </Field>
          <Field>
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              Registrarse
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </FieldSet>
  );
}
