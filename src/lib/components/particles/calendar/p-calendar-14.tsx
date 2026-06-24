"use client";

import { useState } from "react";
import type { DropdownNavProps, DropdownProps } from "react-day-picker";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>,
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  return (
    <Calendar
      captionLayout="dropdown"
      classNames={{
        month_caption: "mx-0",
      }}
      components={{
        Dropdown: (props: DropdownProps) => {
          const items =
            props.options?.map((option) => ({
              label: option.label,
              value: String(option.value),
            })) ?? [];

          return (
            <Select
              items={items}
              onValueChange={(value) => {
                if (props.onChange && value !== null) {
                  handleCalendarChange(value, props.onChange);
                }
              }}
              value={String(props.value)}
            >
              <SelectTrigger className="min-w-none">
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          );
        },
        DropdownNav: (props: DropdownNavProps) => {
          return (
            <div className="flex w-full items-center gap-2">
              {props.children}
            </div>
          );
        },
      }}
      defaultMonth={new Date()}
      hideNavigation
      mode="single"
      onSelect={setDate}
      selected={date}
      startMonth={new Date(1980, 6)}
    />
  );
}
