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
import { useEffect } from "react";

export interface LoginFormProps {}

interface Login {
  loginEmail: string;
  loginPassword: string;
}

export function LoginForm(_props: LoginFormProps) {
  const { formState, onInputChange } = useForm({
    loginEmail: "",
    loginPassword: "",
  });

  const { startLogin, errorMessage, errorSource } = useAuthStore();

  const { loginEmail, loginPassword } = formState as Login;

  const onSubmit = () => {
    startLogin({ email: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (errorMessage?.trim() && errorSource === "login") {
      toast.add({
        type: "error",
        title: errorMessage,
        timeout: 5000,
        data: { variant: "login-error" },
      });
    }
  }, [errorMessage, errorSource]);

  return (
    <FieldSet className="w-full max-w-md bg-stone-950 text-white p-5 rounded-lg">
      <form action={onSubmit}>
        <FieldTitle>
          <h1 className="text-2xl font-bold">Login</h1>
        </FieldTitle>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Email</FieldLabel>
            <Input
              id="username"
              type="email"
              name="loginEmail"
              value={loginEmail}
              onChange={onInputChange}
              placeholder="jhon.doe@example.com"
            />
            <FieldDescription>Ingresa un email válido</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            {/* <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription> */}
            <Input
              id="password"
              type="password"
              name="loginPassword"
              value={loginPassword}
              onChange={onInputChange}
              placeholder="••••••••"
            />
          </Field>
          <Field>
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </FieldSet>
  );
}
