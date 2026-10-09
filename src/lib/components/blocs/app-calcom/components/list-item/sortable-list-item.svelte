<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import ListItem from './list-item.svelte';

  let props: Omit<ComponentProps<typeof ListItem>, 'sortable' | 'child'> = $props();
</script>

<ListItem {...props} sortable />
