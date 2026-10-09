<script lang="ts">
  import KeyIcon from '@lucide/svelte/icons/key';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';

  let { onNewClick }: { onNewClick: () => void } = $props();
</script>

<Empty class="rounded-xl border border-dashed py-8 md:py-12">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <KeyIcon />
    </EmptyMedia>
    <EmptyTitle>No OAuth Clients</EmptyTitle>
    <EmptyDescription>
      You haven't created any OAuth clients yet. Create one to get started.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button onclick={onNewClick}>
      <PlusIcon />
      New
    </Button>
  </EmptyContent>
</Empty>
