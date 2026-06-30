<script lang="ts">
  import { Combobox } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";
  import { getComboboxCtx } from "./combobox.svelte";

  interface Props extends Combobox.TriggerProps {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();

  let ref = $state<HTMLButtonElement | null>(null);
  const ctx = getComboboxCtx();
  $effect(() => {
    ctx?.setTriggerEl(ref);
    return () => ctx?.setTriggerEl(null);
  });
</script>

<Combobox.Trigger
  bind:ref
  class={cn(className)}
  data-slot="combobox-trigger"
  {...restProps}
>
  {@render children?.()}
</Combobox.Trigger>
