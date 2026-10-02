import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/hooks/useCalendarStore";
import { Trash } from "lucide-react";

export const FabDelete = () => {
    const { startDeletingEvent } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    };
    return (
        <Button
            onClick={handleDelete}
            className="z-100 w-16 h-16 fixed rounded-full left-6 bottom-6 bg-red-600 hover:bg-red-800 cursor-pointer"
        >
            <Trash />
        </Button>
    );
};
