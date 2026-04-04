<script lang="ts">
  import type { Snippet } from "svelte";
  import { Toolbar } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = Toolbar.GroupProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Toolbar.Group
  class={cn("flex items-center gap-1", className)}
  data-slot="toolbar-group"
  {...restProps}
>
  {@render children?.()}
</Toolbar.Group>
