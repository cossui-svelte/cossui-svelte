<script lang="ts">
  import type { Snippet } from "svelte";
  import { Command } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = Command.ItemProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Command.Item
  class={cn(
    "flex min-h-8 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-base outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-64 sm:min-h-7 sm:text-sm",
    className,
  )}
  data-slot="command-item"
  {...restProps}
>
  {@render children?.()}
</Command.Item>
