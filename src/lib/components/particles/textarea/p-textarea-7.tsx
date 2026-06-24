import { useId } from "react";
import { Label } from "@/registry/default/ui/label";
import { Textarea } from "@/registry/default/ui/textarea";

export default function Particle() {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        Message <span className="text-destructive">*</span>
      </Label>
      <Textarea id={id} placeholder="Type your message here" required />
    </div>
  );
}
