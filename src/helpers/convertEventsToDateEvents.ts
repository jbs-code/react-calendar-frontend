import type { CalendarEventItem } from "@/calendar";
import { parseISO } from "date-fns";

export const convertEventsToDateEvents = (
    events: (CalendarEventItem & { start: string; end: string })[],
) => {
    return events.map((event) => {
        event.start = parseISO(event.start);
        event.end = parseISO(event.end);

        return event;
    });
};
