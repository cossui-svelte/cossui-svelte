import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";

export default function Particle() {
  return (
    <Group aria-label="Pagination">
      <Group aria-label="Page numbers">
        <Button className="min-w-8" variant="outline">
          1
        </Button>
        <GroupSeparator />
        <Button className="min-w-8" variant="outline">
          2
        </Button>
        <GroupSeparator />
        <Button className="min-w-8" variant="outline">
          3
        </Button>
        <GroupSeparator />
        <Button className="min-w-8" variant="outline">
          4
        </Button>
        <GroupSeparator />
        <Button className="min-w-8" variant="outline">
          5
        </Button>
      </Group>
      <Group aria-label="Navigation">
        <Button aria-label="Previous" size="icon" variant="outline">
          <ArrowLeftIcon aria-hidden="true" />
        </Button>
        <GroupSeparator />
        <Button aria-label="Next" size="icon" variant="outline">
          <ArrowRightIcon aria-hidden="true" />
        </Button>
      </Group>
    </Group>
  );
}
