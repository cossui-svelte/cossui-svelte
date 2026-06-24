"use client";

import { Volume2Icon, VolumeXIcon } from "lucide-react";
import { useState } from "react";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Slider, SliderValue } from "@/registry/default/ui/slider";

export default function Particle() {
  const [value, setValue] = useState<number | readonly number[]>(25);

  return (
    <Field className="*:grid *:grid-cols-[auto_1fr_auto] *:items-center *:gap-x-2">
      <Slider aria-label="Volume slider" onValueChange={setValue} value={value}>
        <div className="col-span-3 mb-2 flex items-center justify-between gap-1">
          <FieldLabel>Volume</FieldLabel>
          <SliderValue />
        </div>
        <VolumeXIcon
          aria-hidden="true"
          className="size-4 shrink-0 opacity-80"
        />
        <Volume2Icon
          aria-hidden="true"
          className="order-1 size-4 shrink-0 opacity-80"
        />
      </Slider>
    </Field>
  );
}
