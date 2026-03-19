<script lang="ts">
  import { page } from "$app/state";
  import Badge from "$lib/components/ui/badge.svelte";

  interface ProductItem {
    href: string;
    label: string;
    upcoming?: boolean;
  }

  interface Props {
    items: ProductItem[];
    currentProduct?: string;
  }

  let { items, currentProduct }: Props = $props();

  const matchingItem = $derived.by(() => {
    if (currentProduct) {
      return items.find(
        (item) => item.label.toLowerCase() === currentProduct!.toLowerCase(),
      );
    }

    const pathname = page.url.pathname;
    if (pathname === "/") return undefined;

    const firstSegment = pathname.slice(1).split("/")[0];
    return firstSegment
      ? items.find(
          (item) => item.label.toLowerCase() === firstSegment.toLowerCase(),
        )
      : undefined;
  });

  const shouldShow = $derived(
    matchingItem !== undefined &&
      (currentProduct ? true : page.url.pathname !== "/"),
  );
</script>

{#if shouldShow && matchingItem}
  <span class="text-muted-foreground/64">{matchingItem.label}</span>
  {#if matchingItem.upcoming}
    <Badge class="-mt-1 ms-2 font-sans max-sm:hidden" variant="info"
      >Upcoming</Badge
    >
  {/if}
{/if}
