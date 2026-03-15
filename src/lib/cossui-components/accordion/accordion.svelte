<script lang="ts">
  import type { Snippet } from "svelte";
  import { Accordion } from "bits-ui";
  import { cn } from "../../utils.js";

  type Props = Accordion.RootProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Accordion.Root
  class={cn("flex flex-col gap-2 data-[orientation=vertical]:flex-row", className)}
  data-slot="accordion"
  {...restProps}
>
  {@render children?.()}
</Accordion.Root>
