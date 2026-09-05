<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { Tabs } from '$lib/components/ui/tabs';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof Tabs> = $props();
</script>

<Tabs class={cn('mt-6', className)} {...restProps} />
