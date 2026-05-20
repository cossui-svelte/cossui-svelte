<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils.js";
  import { Checkbox } from "bits-ui";

  interface Props extends Checkbox.GroupProps {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Checkbox.Group
  class={cn("flex flex-col items-start gap-3", className)}
  {...restProps}
>
  {@render children?.()}
</Checkbox.Group>
