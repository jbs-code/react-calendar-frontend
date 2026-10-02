import calendarApi from "@/api/calendarApi";
import axios from "axios";
import {
    clearErrorMessage,
    onAuthError,
    onChecking,
    onLogin,
    onLogout,
    onLogoutCalendar,
    type AppDispatch,
    type RootState,
} from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/components/ui/toast";

export const useAuthStore = () => {
    const { user, status, errorMessage, errorSource } = useSelector(
        (state: RootState) => state.auth,
    );

    const dispatch = useDispatch<AppDispatch>();

    const startLogin = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post("/auth", {
                email,
                password,
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "token-init-date",
                new Date().getTime().toString(),
            );
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(
                onAuthError({
                    message: "Credenciales incorrectas",
                    source: "login",
                }),
            );
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const startRegister = async ({
        name,
        email,
        password,
    }: {
        name: string;
        email: string;
        password: string;
    }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post("/auth/new", {
                name,
                email,
                password,
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "token-init-date",
                new Date().getTime().toString(),
            );
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            toast.add({
                type: "success",
                title: "Nuevo usuario registrado",
                timeout: 5000,
                data: { variant: "login-error" },
            });
        } catch (error) {
            const message =
                axios.isAxiosError(error) &&
                typeof error.response?.data?.msg === "string"
                    ? error.response.data.msg
                    : "Credenciales incorrectas";
            dispatch(onAuthError({ message, source: "register" }));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) return dispatch(onLogout(""));

        try {
            const { data } = await calendarApi.get("auth/renew");
            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "token-init-date",
                new Date().getTime().toString(),
            );
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout(""));
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout(""));
    };

    return {
        user,
        status,
        errorMessage,
        errorSource,
        startLogin,
        startRegister,
        startLogout,
        checkAuthToken,
    };
};
