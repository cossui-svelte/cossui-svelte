<script lang="ts">
  import {
    SegmentedControl,
    SegmentedControlItem
  } from '#lib/components/ui/segmented-control/index.js';

  const links = [
    { href: '#overview', label: 'Overview' },
    { href: '#activity', label: 'Activity' },
    { href: '#settings', label: 'Settings' }
  ];

  let current = $state('#overview');
</script>

<SegmentedControl aria-label="Project sections" size="lg">
  {#snippet child({ props, content })}
    <nav {...props}>{@render content()}</nav>
  {/snippet}
  {#each links as link (link.href)}
    <SegmentedControlItem>
      {#snippet child({ props })}
        <a
          {...props}
          aria-current={link.href === current ? 'page' : undefined}
          href={link.href}
          onclick={() => (current = link.href)}>{link.label}</a
        >
      {/snippet}
    </SegmentedControlItem>
  {/each}
</SegmentedControl>
