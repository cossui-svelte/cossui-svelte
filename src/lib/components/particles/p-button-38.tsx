import { RiGithubFill, RiGoogleFill, RiTwitterXFill } from "@remixicon/react";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline">
        <RiGoogleFill aria-hidden="true" />
        <span className="flex-1">Login with Google</span>
      </Button>
      <Button variant="outline">
        <RiTwitterXFill aria-hidden="true" />
        <span className="flex-1">Login with X</span>
      </Button>
      <Button variant="outline">
        <RiGithubFill aria-hidden="true" />
        <span className="flex-1">Login with GitHub</span>
      </Button>
    </div>
  );
}
