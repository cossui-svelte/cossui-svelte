"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Slider } from "@/registry/default/ui/slider";

const min = 0;
const max = 200;
const step = 5;

export default function Particle() {
  const [value, setValue] = useState(100);

  return (
    <Field name="credits">
      <FieldLabel className="tabular-nums">{value} credits/mo</FieldLabel>
      <div className="flex items-center gap-2">
        <Button
          aria-label="Decrease value"
          disabled={value === min}
          onClick={() => setValue(Math.max(min, value - step))}
          size="icon"
          variant="outline"
        >
          <MinusIcon aria-hidden="true" />
        </Button>
        <Slider
          aria-label="Credits slider"
          className="flex-1"
          max={max}
          min={min}
          onValueChange={(v) => setValue(Array.isArray(v) ? v[0] : v)}
          step={step}
          value={value}
        />
        <Button
          aria-label="Increase value"
          disabled={value === max}
          onClick={() => setValue(Math.min(max, value + step))}
          size="icon"
          variant="outline"
        >
          <PlusIcon aria-hidden="true" />
        </Button>
      </div>
    </Field>
  );
}
