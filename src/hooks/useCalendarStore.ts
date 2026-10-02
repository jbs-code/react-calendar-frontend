import calendarApi from "@/api/calendarApi";
import type { CalendarModalState } from "@/calendar";
import { toast } from "@/components/ui/toast";
import { isAxiosError } from "axios";
import {
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onSetActiveEvent,
    onUpdateEvent,
    type AppDispatch,
    type RootState,
} from "@/store";
import { useDispatch, useSelector } from "react-redux";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector(
        (state: RootState) => state.calendar,
    );

    const { user } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch<AppDispatch>();

    const setActiveEvent = (calendarEvent: Partial<CalendarModalState>) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (
        calendarEvent: Partial<CalendarModalState>,
    ) => {
        try {
            if (calendarEvent.id) {
                await calendarApi.put(
                    `/events/${calendarEvent.id}`,
                    calendarEvent,
                );
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
            const { data } = await calendarApi.post("/events", calendarEvent);
            dispatch(
                onAddNewEvent({
                    ...calendarEvent,
                    id: String(data.event.id ?? data.event._id),
                    user,
                }),
            );
        } catch (error: unknown) {
            console.log(error);
             toast.add({
                type: "error",
                title: "Error al guardar evento",
                description:
                    (isAxiosError(error) && error.response?.data?.msg) ||
                    "Error al guardar el evento",
                timeout: 5000,
                data: { variant: "login-error" },
            });
        }
    };

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent!.id}`);
            dispatch(onDeleteEvent());
        } catch (error: unknown) {
            console.log(error);
            toast.add({
                type: "error",
                title: "Error al borrar evento",
                description:
                    (isAxiosError(error) && error.response?.data?.msg) ||
                    "Error al borrar el evento",
                timeout: 5000,
                data: { variant: "login-error" },
            });
        }
    };

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get("/events");
            const serializedEvents = (data.events ?? []).map((event: any) => {
                const { _id, ...eventData } = event;
                return {
                    ...eventData,
                    id: String(event.id ?? _id),
                    start: new Date(event.start).toISOString(),
                    end: new Date(event.end).toISOString(),
                };
            });

            dispatch(onLoadEvents(serializedEvents));
        } catch (error) {
            console.log(error);
        }
    };

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    };
};
