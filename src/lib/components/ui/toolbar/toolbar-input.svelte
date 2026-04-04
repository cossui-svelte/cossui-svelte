<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  type Props = HTMLInputAttributes;

  let { class: className, ...restProps }: Props = $props();
</script>

<input
  class={cn(className)}
  data-slot="toolbar-input"
  {...restProps}
/>
