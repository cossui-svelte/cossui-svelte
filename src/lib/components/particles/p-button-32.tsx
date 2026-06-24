import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <Button variant="outline">
      Messages
      <Badge className="-me-1" variant="outline">
        18
      </Badge>
    </Button>
  );
}
