import { configureStore } from "@reduxjs/toolkit";
// import {authSlice, calendarSlice, uiSlice} from '@/store'
import { authSlice } from "@/store/auth/authSlice";
import { calendarSlice } from "@/store/calendar/calendarSlice";
import { uiSlice } from "@/store/ui/uiSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ["calendar.events", "calendar.activeEvent"],
                ignoredActionPaths: ["payload.start", "payload.end"],
            },
        }),
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
