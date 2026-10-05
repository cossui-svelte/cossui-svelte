<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { Tabs } from '#lib/components/ui/tabs/index.js';
  import { cn } from '#lib/utils.js';

  let { class: className, ...restProps }: ComponentProps<typeof Tabs> = $props();
</script>

<Tabs class={cn('mt-6', className)} {...restProps} />
