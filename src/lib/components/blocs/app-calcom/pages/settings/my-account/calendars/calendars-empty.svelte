<script lang="ts">
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';
</script>

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <CalendarIcon />
    </EmptyMedia>
    <EmptyTitle>No calendar apps</EmptyTitle>
    <EmptyDescription>
      You have not yet connected any calendar apps. Connect a calendar app to get started.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline">Connect your first calendar</Button>
  </EmptyContent>
</Empty>
