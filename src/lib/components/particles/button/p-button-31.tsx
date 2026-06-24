import { PrinterIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";

export default function Particle() {
  return (
    <Button variant="outline">
      <PrinterIcon aria-hidden="true" />
      Print
      <KbdGroup className="-me-1">
        <Kbd>&#8984;</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </Button>
  );
}
