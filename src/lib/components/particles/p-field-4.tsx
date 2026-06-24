import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function FieldWithErrorDemo() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input placeholder="Enter your email" type="email" />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  );
}
