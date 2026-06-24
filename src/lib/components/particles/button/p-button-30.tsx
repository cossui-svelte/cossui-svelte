import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <Button>
      Get Started
      <ArrowRightIcon
        aria-hidden="true"
        className="in-[[data-slot=button]:hover]:translate-x-0.5 transition-transform"
      />
    </Button>
  );
}
