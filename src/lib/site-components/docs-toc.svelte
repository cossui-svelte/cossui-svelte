<script lang="ts">
  import { cn } from "../utils.js";

  interface TocItem {
    title?: string;
    url: string;
    depth: number;
  }

  interface Props {
    toc: TocItem[];
    class?: string;
  }

  let { toc, class: className }: Props = $props();

  let activeId = $state<string | null>(null);

  const itemIds = $derived(toc.map((item) => item.url.replace("#", "")));

  $effect(() => {
    if (!activeId && itemIds.length) {
      activeId = itemIds[0] ?? null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    for (const id of itemIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

{#if toc?.length}
  <div class={cn("z-10 flex flex-col gap-1 py-2 ps-6 pe-4 text-sm", className)}>
    <p class="flex h-7 items-center font-medium text-xs">On This Page</p>
    <div
      class="before:-left-3.25 relative ms-3.5 flex flex-col gap-0.5 before:absolute before:inset-y-0 before:w-px before:bg-border"
    >
      {#each toc as item (item.url)}
        <a
          class="before:-left-3.25 relative py-1 text-[.8125rem] text-sidebar-foreground leading-4.5 no-underline transition-colors before:absolute before:inset-y-px before:w-px before:rounded-full hover:bg-transparent hover:text-foreground data-[active=true]:bg-transparent data-[depth=3]:ps-3.5 data-[depth=4]:ps-5.5 data-[active=true]:text-foreground data-[active=true]:before:w-0.5 data-[active=true]:before:bg-primary"
          data-active={item.url === `#${activeId}`}
          data-depth={item.depth}
          href={item.url}
        >
          {item.title}
        </a>
      {/each}
    </div>
  </div>
{/if}
