<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = Combobox.EmptyProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Combobox.Empty
  class={cn(
    "p-2 text-center text-base text-muted-foreground sm:text-sm",
    className,
  )}
  data-slot="combobox-empty"
  {...restProps}
>
  {@render children?.()}
</Combobox.Empty>
