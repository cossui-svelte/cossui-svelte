import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <Button className="h-auto! gap-4 px-4 py-3 text-left" variant="outline">
      <div className="flex flex-col gap-0.5">
        <h3>Talent Agency</h3>
        <p className="whitespace-break-spaces font-normal text-muted-foreground">
          Matches for your roster
        </p>
      </div>
      <ChevronRightIcon
        aria-hidden="true"
        className="in-[[data-slot=button]:hover]:translate-x-0.5 transition-transform"
      />
    </Button>
  );
}
