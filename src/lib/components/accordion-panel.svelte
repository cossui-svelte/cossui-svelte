<script lang="ts">
  import type { Snippet } from "svelte";
  import { Accordion } from "bits-ui";
  import { cn } from "../utils.js";

  type Props = Accordion.ContentProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Accordion.Content
  class="overflow-hidden text-muted-foreground text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  data-slot="accordion-panel"
  {...restProps}
>
  <div class={cn("pt-0 pb-4", className)}>
    {@render children?.()}
  </div>
</Accordion.Content>
