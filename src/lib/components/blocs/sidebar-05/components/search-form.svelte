<script lang="ts">
  import SearchIcon from '@lucide/svelte/icons/search';
  import type { HTMLFormAttributes } from 'svelte/elements';
  import { Label } from '#lib/components/ui/label/index.js';
  import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput
  } from '#lib/components/ui/sidebar/index.js';
  import type { WithElementRef } from '#lib/utils.js';

  let { ref = $bindable(null), ...restProps }: WithElementRef<HTMLFormAttributes> = $props();
</script>

<form bind:this={ref} {...restProps}>
  <SidebarGroup class="py-0">
    <SidebarGroupContent class="relative">
      <Label for="search" class="sr-only">Search</Label>
      <SidebarInput id="search" placeholder="Search the docs..." class="ps-8" />
      <SearchIcon
        class="pointer-events-none absolute start-2 top-1/2 size-4 -translate-y-1/2 opacity-50 select-none"
      />
    </SidebarGroupContent>
  </SidebarGroup>
</form>
