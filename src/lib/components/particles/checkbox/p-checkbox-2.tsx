import { Checkbox } from "@/registry/default/ui/checkbox";
import { Label } from "@/registry/default/ui/label";

export default function Particle() {
  return (
    <Label>
      <Checkbox defaultChecked disabled />
      Accept terms and conditions
    </Label>
  );
}
