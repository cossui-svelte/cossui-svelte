<script lang="ts">
  import LinkIcon from '@lucide/svelte/icons/link';
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

  let { description, onAddClick }: { description: string; onAddClick: () => void } = $props();
</script>

<Empty class="rounded-xl border border-dashed py-8 md:py-12">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <LinkIcon />
    </EmptyMedia>
    <EmptyTitle>Add delegation credential</EmptyTitle>
    <EmptyDescription>{description}</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button onclick={onAddClick} type="button">
      <PlusIcon aria-hidden="true" />
      Add delegation credential
    </Button>
  </EmptyContent>
</Empty>
