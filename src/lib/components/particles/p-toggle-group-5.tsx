import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupSeparator,
} from "@/registry/default/ui/toggle-group";

export default function Particle() {
  return (
    <ToggleGroup
      defaultValue={["bold"]}
      orientation="vertical"
      variant="outline"
    >
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupSeparator orientation="horizontal" />
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupSeparator orientation="horizontal" />
      <ToggleGroupItem aria-label="Toggle underline" value="underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
