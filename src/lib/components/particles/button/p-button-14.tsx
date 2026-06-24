import { PlusIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <Button aria-label="Add" size="icon-sm">
      <PlusIcon aria-hidden="true" />
    </Button>
  );
}
