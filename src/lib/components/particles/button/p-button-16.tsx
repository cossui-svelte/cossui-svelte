import { DownloadIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  return (
    <Button>
      <DownloadIcon aria-hidden="true" />
      Download
    </Button>
  );
}
