import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

export default function Particle() {
  return (
    <Field>
      <FieldLabel>Subscribe</FieldLabel>
      <InputGroup>
        <InputGroupInput placeholder="Your best email" type="email" />
        <InputGroupAddon align="inline-end">
          <Button aria-label="Subscribe" size="icon-xs" variant="ghost">
            <ArrowRightIcon aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  );
}
