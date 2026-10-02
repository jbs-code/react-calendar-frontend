import type { CalendarEventItem } from "@/calendar/components/pages/CalentarPage";
import { createSlice } from "@reduxjs/toolkit";

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: "Mi cumpleaños",
//     notes: "Comprar pastel",
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: "#fafafa",
//     user: {
//         _id: "123",
//         name: "Jaime",
//     },
// };

interface Calendar {
    isLoadingEvents: boolean;
    events: CalendarEventItem[];
    activeEvent: CalendarEventItem | null;
}
const initialState: Calendar = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },

        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },

        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map((event) => {
                if (event.id === payload.id) return payload;
                return event;
            });
        },

        onDeleteEvent: (state) => {
            state.events = state.events.filter(
                (event) => event.id !== state.activeEvent?.id,
            );
            state.activeEvent = null;
        },

        onLoadEvents: (state, { payload }) => {
            state.isLoadingEvents = false;

            payload.forEach(
                (event: CalendarEventItem & { start: string; end: string }) => {
                    const eventId = event.id;
                    const exists = state.events.some(
                        (dbEvent) => dbEvent.id === eventId,
                    );

                    if (!exists) {
                        state.events.push({
                            ...event,
                            start: new Date(event.start),
                            end: new Date(event.end),
                        });
                    }
                },
            );
        },

        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        },
    },
});

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
} = calendarSlice.actions;
