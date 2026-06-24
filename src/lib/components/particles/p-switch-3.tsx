import { useId } from "react";
import { Label } from "@/registry/default/ui/label";
import { Switch } from "@/registry/default/ui/switch";

export default function Particle() {
  const id = useId();

  return (
    <div className="flex items-start gap-2">
      <Switch defaultChecked id={id} />
      <div className="flex flex-col gap-1">
        <Label htmlFor={id}>Marketing emails</Label>
        <p className="text-muted-foreground text-xs">
          By enabling marketing emails, you agree to receive emails.
        </p>
      </div>
    </div>
  );
}
