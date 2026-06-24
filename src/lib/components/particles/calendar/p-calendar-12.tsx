"use client";

import { useState } from "react";
import type { WeekNumberProps } from "react-day-picker";
import { Calendar } from "@/registry/default/ui/calendar";

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      components={{
        WeekNumber: ({ week, ...props }: WeekNumberProps) => {
          return (
            <th {...props}>
              <span className="inline-flex size-(--cell-size) items-center justify-center">
                {week.weekNumber}
              </span>
            </th>
          );
        },
      }}
      fixedWeeks
      mode="single"
      onSelect={setDate}
      selected={date}
      showWeekNumber
    />
  );
}
