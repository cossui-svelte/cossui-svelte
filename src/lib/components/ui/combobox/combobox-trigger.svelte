<script lang="ts">
  import { Combobox } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  interface Props extends Combobox.TriggerProps {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Combobox.Trigger
  class={cn(className)}
  data-slot="combobox-trigger"
  {...restProps}
>
  {@render children?.()}
</Combobox.Trigger>
