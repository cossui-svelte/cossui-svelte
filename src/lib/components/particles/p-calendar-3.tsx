"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/registry/default/ui/calendar";

export default function Particle() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  return <Calendar mode="range" onSelect={setRange} selected={range} />;
}
