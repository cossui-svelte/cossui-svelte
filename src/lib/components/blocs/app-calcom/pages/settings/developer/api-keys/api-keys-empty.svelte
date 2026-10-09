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
    <EmptyTitle>Create your first API key</EmptyTitle>
    <EmptyDescription>API keys allow other apps to communicate with Cal.com</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button onclick={onNewClick}>
      <PlusIcon />
      New
    </Button>
  </EmptyContent>
</Empty>
