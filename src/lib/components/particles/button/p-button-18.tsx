import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

export default function Particle() {
  return (
    <Button disabled>
      <Spinner />
      Loading...
    </Button>
  );
}
