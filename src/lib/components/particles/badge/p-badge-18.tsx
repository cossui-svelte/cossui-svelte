import { Badge } from "@/registry/default/ui/badge";

export default function Particle() {
  return (
    <Badge variant="outline">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-red-500" />
      Failed
    </Badge>
  );
}
