<script lang="ts">
  import type { Snippet } from "svelte";
  import { Accordion } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = Accordion.ItemProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Accordion.Item
  class={cn("border-b last:border-b-0", className)}
  data-slot="accordion-item"
  {...restProps}
>
  {@render children?.()}
</Accordion.Item>
