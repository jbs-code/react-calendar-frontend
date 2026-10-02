import { LoginForm, RegisterForm } from "@/auth";

export interface AuthPageProps {
    
}

export function AuthPage(_props: AuthPageProps) {
    

    return (
        <div className="flex justify-center items-center h-screen gap-2">
            <LoginForm/>
            <RegisterForm/>
        </div>
    );
}
