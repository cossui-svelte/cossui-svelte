<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLFormElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<form
  class={cn("flex w-full flex-col gap-4", className)}
  data-slot="form"
  {...restProps}
>
  {@render children?.()}
</form>
