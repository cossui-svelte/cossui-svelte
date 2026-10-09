<script lang="ts">
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import LayoutListIcon from '@lucide/svelte/icons/layout-list';
  import { router } from '../../lib/router.svelte.js';
  import TabbedNav, { type Tab } from './tabbed-nav.svelte';

  let { class: className }: { class?: string } = $props();

  const viewTabs: Tab[] = $derived([
    { icon: LayoutListIcon, title: 'List view', url: router.path },
    { icon: CalendarIcon, title: 'Calendar view', url: `${router.path}?view=calendar` }
  ]);
</script>

<TabbedNav ariaLabel="View type" class={className} tabs={viewTabs} />
