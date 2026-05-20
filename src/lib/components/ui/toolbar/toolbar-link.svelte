<script lang="ts">
  import type { Snippet } from "svelte";
  import { Toolbar } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = Toolbar.LinkProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Toolbar.Link
  class={cn(className)}
  data-slot="toolbar-link"
  {...restProps}
>
  {@render children?.()}
</Toolbar.Link>
