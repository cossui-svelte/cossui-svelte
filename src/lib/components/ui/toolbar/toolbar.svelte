<script lang="ts">
  import { Toolbar } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  type Props = Toolbar.RootProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Toolbar.Root
  class={cn(
    "relative flex gap-2 rounded-xl border bg-card not-dark:bg-clip-padding p-1 text-card-foreground",
    className,
  )}
  data-slot="toolbar"
  {...restProps}
>
  {@render children?.()}
</Toolbar.Root>
