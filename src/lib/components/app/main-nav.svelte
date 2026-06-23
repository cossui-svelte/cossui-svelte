<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { page } from "$app/state";

  interface Props {
    class?: string;
    items: { href: string; label: string }[];
  }

  let { items, class: className }: Props = $props();
</script>

<nav class={cn("items-center gap-2", className)}>
  {#each items as item (item.href)}
    <a
      href={item.href}
      class={cn(
        buttonVariants({ variant: "ghost" }),
        page.url.pathname.includes(item.href) && "text-primary",
      )}
      data-pressed={page.url.pathname.includes(item.href) || undefined}
    >
      {item.label}
    </a>
  {/each}
</nav>
