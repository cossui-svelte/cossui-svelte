import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from "@remixicon/react";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <div className="inline-flex flex-wrap gap-2">
      <Button aria-label="Login with Google" size="icon" variant="outline">
        <RiGoogleFill aria-hidden="true" />
      </Button>
      <Button aria-label="Login with Facebook" size="icon" variant="outline">
        <RiFacebookFill aria-hidden="true" />
      </Button>
      <Button aria-label="Login with X" size="icon" variant="outline">
        <RiTwitterXFill aria-hidden="true" />
      </Button>
      <Button aria-label="Login with GitHub" size="icon" variant="outline">
        <RiGithubFill aria-hidden="true" />
      </Button>
    </div>
  );
}
