<script lang="ts">
  import Folder from "@lucide/svelte/icons/folder";
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardFrame,
    CardFrameAction,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel,
  } from "$lib/components/ui/card";
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
  } from "$lib/components/ui/empty";
</script>

<CardFrame class="w-full">
  <CardFrameHeader>
    <CardFrameTitle>Project</CardFrameTitle>
    <CardFrameDescription>Manage your projects</CardFrameDescription>
    <CardFrameAction>
      <Button variant="outline">
        <Plus />
        Add
      </Button>
    </CardFrameAction>
  </CardFrameHeader>
  <Card>
    <CardPanel>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder />
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
