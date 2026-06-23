<script lang="ts">
  import { Checkbox } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

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
