<script lang="ts">
  import Book from "@lucide/svelte/icons/book";
  import Route from "@lucide/svelte/icons/route";
  import { Button } from "$lib/components/ui/button";
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
  } from "$lib/components/ui/empty";
</script>

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Route aria-hidden />
    </EmptyMedia>
    <EmptyTitle>No upcoming meetings</EmptyTitle>
    <EmptyDescription>Create a meeting to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <div class="flex gap-2">
      <Button size="sm">Create meeting</Button>
      <Button size="sm" variant="outline">
        <Book aria-hidden />
        View docs
      </Button>
    </div>
  </EmptyContent>
</Empty>
