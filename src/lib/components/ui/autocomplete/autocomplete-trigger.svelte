<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox } from "bits-ui";
  import { cn } from "$lib/utils.js";

  interface Props extends Combobox.TriggerProps {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Combobox.Trigger
  class={cn(className)}
  data-slot="autocomplete-trigger"
  {...restProps}
>
  {@render children?.()}
</Combobox.Trigger>
