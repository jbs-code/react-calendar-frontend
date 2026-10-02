import type { CalendarEventItem } from "..";


//TODO: Fix problem
export function CalendarEvent(event:CalendarEventItem) {
    
    const {title, user} = event;

    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    );
}
