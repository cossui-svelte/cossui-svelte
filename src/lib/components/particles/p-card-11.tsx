import { FolderIcon, PlusIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
} from "@/registry/default/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

export default function Particle() {
  return (
    <CardFrame className="w-full">
      <CardFrameHeader>
        <CardFrameTitle>Project</CardFrameTitle>
        <CardFrameDescription>Manage your projects</CardFrameDescription>
        <CardFrameAction>
          <Button variant="outline">
            <PlusIcon />
            Add
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <Card>
        <CardPanel>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderIcon />
              </EmptyMedia>
              <EmptyTitle>No projects yet</EmptyTitle>
              <EmptyDescription>
                Get started by adding your first project.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardPanel>
      </Card>
    </CardFrame>
  );
}
