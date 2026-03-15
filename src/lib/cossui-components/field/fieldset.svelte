<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLFieldSetElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<fieldset
  class={cn("flex w-full max-w-64 flex-col gap-6", className)}
  data-slot="fieldset"
  {...restProps}
>
  {@render children?.()}
</fieldset>
