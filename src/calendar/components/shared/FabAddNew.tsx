import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/hooks/useCalendarStore";
import { useUiStore } from "@/hooks/useUiStore";
import { addHours } from "date-fns";
import { Plus } from "lucide-react";

export const FabAddNew = () => {
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "#d34782",
            user: {
                _id: "123",
                name: "Jaime",
            },
        });
        openDateModal();
    };

    return (
        <Button
            onClick={handleClickNew}
            className="z-100 w-16 h-16 fixed rounded-full right-6 bottom-6 bg-sky-600 hover:bg-sky-800 cursor-pointer"
        >
            <Plus />
        </Button>
    );
};
