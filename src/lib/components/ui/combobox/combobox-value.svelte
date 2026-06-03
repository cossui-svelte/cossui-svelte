<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
    placeholder?: string;
    value?: string;
  }

  let {
    class: className,
    children,
    placeholder,
    value,
    ...restProps
  }: Props = $props();
</script>

<span
  class={cn(!value && "text-muted-foreground", className)}
  data-slot="combobox-value"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else if value}
    {value}
  {:else if placeholder}
    {placeholder}
  {/if}
</span>
