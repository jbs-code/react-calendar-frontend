import { createSlice } from "@reduxjs/toolkit";

interface authState {
    status: "checking" | "authenticated" | "not-authenticated";
    user: Object;
    errorMessage: undefined | string;
    errorSource: undefined | "login" | "register";
}

const initialState: authState = {
    status: "checking",
    user: {},
    errorMessage: undefined,
    errorSource: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onChecking: (state) => {
            ((state.status = "checking"),
                (state.user = {}),
                (state.errorMessage = undefined),
                (state.errorSource = undefined));
        },
        onLogin: (state, { payload }) => {
            ((state.status = "authenticated"),
                (state.user = payload),
                (state.errorMessage = undefined),
                (state.errorSource = undefined));
        },
        onLogout: (state, { payload }) => {
            ((state.status = "not-authenticated"),
                (state.user = {}),
                (state.errorMessage = payload),
                (state.errorSource = undefined));
        },
        onAuthError: (state, { payload }) => {
            state.status = "not-authenticated";
            state.user = {};
            state.errorMessage = payload.message;
            state.errorSource = payload.source;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
            state.errorSource = undefined;
        },
    },
});

export const { onChecking, onLogin, onLogout, onAuthError, clearErrorMessage } =
    authSlice.actions;
