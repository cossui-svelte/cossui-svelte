<script lang="ts">
  import { page } from '$app/state';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { cn } from '#lib/utils.js';

  interface Props {
    class?: string;
    items: { href: string; label: string }[];
  }

  let { items, class: className }: Props = $props();
</script>

<nav class={cn('items-center gap-2', className)}>
  {#each items as item (item.href)}
    <!-- eslint-disable svelte/no-navigation-without-resolve -- item.href is caller-supplied nav data, already app-relative -->
    <a
      href={item.href}
      class={cn(
        buttonVariants({ variant: 'ghost' }),
        page.url.pathname.includes(item.href) && 'text-primary'
      )}
      data-pressed={page.url.pathname.includes(item.href) || undefined}
    >
      {item.label}
    </a>
    <!-- eslint-enable svelte/no-navigation-without-resolve -->
  {/each}
</nav>
