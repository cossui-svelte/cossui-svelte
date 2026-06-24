"use client";

import { useState } from "react";
import { Calendar } from "@/registry/default/ui/calendar";

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      classNames={{
        day_button: "rounded-full",
      }}
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  );
}
