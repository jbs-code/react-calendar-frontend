import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
    NavBar,
    CalendarEvent,
    CalendarModal,
    FabAddNew,
    FabDelete,
} from "@/calendar";
import { localizer } from "@/helpers";
import { getMessagesEs } from "@/helpers/getMessagesEs";
import { useEffect, useState } from "react";
import { useUiStore } from "@/hooks/useUiStore";
import { useCalendarStore } from "@/hooks/useCalendarStore";
import { useAuthStore } from "@/hooks/useAuthStore";

export interface CalentarPageProps {}

export type CalendarEventItem = {
    id: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: {
        _id: string;
        name: string;
    };
};

export function CalendarPage(_props: CalentarPageProps) {
    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "week",
    );

    const { user } = useAuthStore();

    const { events, hasEventSelected, setActiveEvent, startLoadingEvents } =
        useCalendarStore();
    const { isDateModalOpen, openDateModal } = useUiStore();

    useEffect(() => {
        startLoadingEvents();
    }, []);

    const eventStyleGetter = (
        event: CalendarEventItem,
        _start: Date,
        _end: Date,
        isSelected: boolean,
    ) => {
        const isMyEvent =
            (user as Object & { uid: string }).uid === event.user._id;
        const style = isMyEvent
            ? {
                  backgroundColor: isSelected ? "#073E9D" : "#347CF7",
                  borderRadius: "0px",
                  opacity: 0.8,
                  color: "white",
              }
            : {
                  backgroundColor: "#465660",
                  borderRadius: "0px",
                  opacity: 0.8,
                  color: "white",
              };

        return { style };
    };

    const onDoubleClick = (_event: CalendarEventItem) => {
        openDateModal();
    };

    const onSelect = (event: CalendarEventItem) => {
        // console.log(event)
        setActiveEvent(event);
    };

    const onViewChanged = (event: string) => {
        console.log({ onViewChanged: event });
        localStorage.setItem("lastView", event);
        setLastView(event);
    };

    return (
        <div className="">
            <NavBar />
            <div>
                <Calendar
                    culture="es"
                    localizer={localizer}
                    events={events}
                    defaultView={lastView as any}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "calc(100vh - 80px)" }}
                    eventPropGetter={eventStyleGetter}
                    messages={getMessagesEs()}
                    components={{
                        event: ({ event }) => <CalendarEvent {...event} />,
                    }}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelect}
                    onView={onViewChanged}
                />
                <CalendarModal />
                <FabAddNew />

                {hasEventSelected && !isDateModalOpen && <FabDelete />}
            </div>
        </div>
    );
}
