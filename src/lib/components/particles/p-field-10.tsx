"use client";

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Textarea } from "@/registry/default/ui/textarea";

export default function Particle() {
  return (
    <Field>
      <FieldLabel>Bio</FieldLabel>
      <Textarea placeholder="Tell us about yourself…" />
      <FieldDescription>
        Write a short bio. Maximum 500 characters.
      </FieldDescription>
    </Field>
  );
}
