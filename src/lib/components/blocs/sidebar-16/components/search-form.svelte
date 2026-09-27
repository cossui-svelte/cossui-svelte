<script lang="ts">
  import SearchIcon from '@lucide/svelte/icons/search';
  import type { HTMLFormAttributes } from 'svelte/elements';
  import { Label } from '$lib/components/ui/label';
  import { SidebarInput } from '$lib/components/ui/sidebar';
  import type { WithElementRef } from '$lib/utils';

  let { ref = $bindable(null), ...restProps }: WithElementRef<HTMLFormAttributes> = $props();
</script>

<form {...restProps} bind:this={ref}>
  <div class="relative">
    <Label for="search" class="sr-only">Search</Label>
    <SidebarInput id="search" placeholder="Type to search..." class="h-8 ps-7" />
    <SearchIcon
      class="pointer-events-none absolute start-2 top-1/2 size-4 -translate-y-1/2 opacity-50 select-none"
    />
  </div>
</form>
