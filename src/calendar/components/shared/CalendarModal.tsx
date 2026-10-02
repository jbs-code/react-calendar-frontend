import { type ChangeEvent, useEffect, useState, useTransition } from "react";

import Modal from "react-modal";
import { addHours, differenceInSeconds } from "date-fns";

import { DatePicker } from "@/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { useUiStore } from "@/hooks/useUiStore";
import { useCalendarStore } from "@/hooks/useCalendarStore";

export interface CalendarModalProps {}

export interface CalendarModalState {
    id?: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: {
        _id: string;
        name: string;
    };
}

Modal.setAppElement("#root");

export function CalendarModal(_props: CalendarModalProps) {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [formValues, setFormValues] = useState<CalendarModalState>({
        title: "Jaime",
        notes: "BS",
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: "#d34782",
        user: {
            _id: "123",
            name: "Jaime",
        },
    });

    const [isPending] = useTransition();

    const { activeEvent, startSavingEvent } = useCalendarStore();

    useEffect(() => {
        if (activeEvent) setFormValues({ ...activeEvent });
    }, [activeEvent]);

    const onCloseModal = () => {
        // console.log("close modal");
        closeDateModal();
    };

    const onChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const onSubmit = async () => {
        const difference = differenceInSeconds(
            formValues.end,
            formValues.start,
        );

        if (isNaN(difference) || difference < 0) {
            toast.add({
                type: "error",
                title: "Error en las fechas",
                description: "La fecha de finalización no puede ser menor a la fecha de inicio.",
                timeout: 5000,
            });
            return;
        }

        if (formValues.title.length <= 0) {
            toast.add({
                type: "error",
                title: "Falta título",
                description: "El título es necesario.",
                timeout: 5000,
            });
            return;
        }

        await startSavingEvent(formValues);
        closeDateModal();
    };

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            className="modal overflow-scroll"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <form action={onSubmit}>
                <FieldSet className="w-full">
                    <FieldGroup>
                        <FieldTitle>
                            <h1 className="text-2xl font-semibold">
                                Nuevo Evento
                            </h1>
                        </FieldTitle>
                        <FieldSeparator />
                        <Field>
                            <FieldLabel>Fecha y hora de inicio</FieldLabel>
                            <DatePicker
                                name="start"
                                date={formValues.start}
                                setDate={setFormValues}
                                placeholder="Fecha de inicio"
                            />
                        </Field>
                        <Field>
                            <FieldLabel>
                                Fecha y hora de finalización
                            </FieldLabel>
                            <DatePicker
                                name="end"
                                date={formValues.end}
                                setDate={setFormValues}
                                startDate={formValues.start}
                                placeholder="Fecha de finalización"
                            />
                        </Field>
                        <FieldSeparator />
                        <Field>
                            <FieldLabel>Título y notas</FieldLabel>
                            <Input
                                name="title"
                                type="text"
                                autoComplete="off"
                                placeholder="Título del evento"
                                onChange={onChange}
                                value={formValues.title}
                            />
                            <FieldDescription>
                                Una descripción corta
                            </FieldDescription>
                        </Field>
                        <Field>
                            <Textarea
                                name="notes"
                                placeholder="Notas"
                                rows={5}
                                onChange={onChange}
                                value={formValues.notes}
                            />
                            <FieldDescription>
                                Información adicional
                            </FieldDescription>
                        </Field>
                        <FieldSeparator />
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Guardando..." : "Guardar"}
                        </Button>
                    </FieldGroup>
                </FieldSet>
            </form>
        </Modal>
    );
}
