import { type Dispatch, type SetStateAction } from "react";

import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import type { Matcher } from "react-day-picker";

import { es } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { CalendarModalState } from "@/calendar";

interface Props {
  placeholder?: string;
  name: "start" | "end";
  date: Date;
  setDate: Dispatch<SetStateAction<CalendarModalState>>;
  startDate?: Date;
}

export function DatePicker({
  placeholder,
  name,
  date,
  setDate,
  startDate,
}: Props) {
  const hiddenDates: Matcher = startDate
    ? {
        before: startDate,
      }
    : false;

  return (
    <FieldGroup className="max-w-xs flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Día</FieldLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant={"outline"}
                data-empty={!date}
                className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                {date ? (
                  format(date, "PPP", {
                    locale: es,
                  })
                ) : (
                  <span>{placeholder}</span>
                )}
                <ChevronDownIcon data-icon="inline-end" />
              </Button>
            }
          />
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              hidden={hiddenDates}
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                if (!selectedDate) return;

                const nextDate = new Date(selectedDate);
                nextDate.setHours(
                  date.getHours(),
                  date.getMinutes(),
                  // date.getSeconds(),
                  // date.getMilliseconds(),
                );

                name === "start"
                  ? setDate((current) => ({
                      ...current,
                      [name]: nextDate,
                      end: nextDate,
                    }))
                  : setDate((current) => ({
                      ...current,
                      [name]: nextDate,
                    }));
              }}
              defaultMonth={date}
              locale={es}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional">Hora</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="60"
          value={format(date, "HH:mm")}
          onChange={(event) => {
            const [hours, minutes] = event.target.value.split(":").map(Number);

            if ([hours, minutes].some((value) => Number.isNaN(value))) {
              return;
            }

            setDate((current) => {
              const nextDate = new Date(current[name]);
              nextDate.setHours(hours, minutes, 0);

              return {
                ...current,
                [name]: nextDate,
              };
            });
          }}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  );
}
