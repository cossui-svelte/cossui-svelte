<script lang="ts">
  import { Toolbar } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  type Props = Toolbar.ButtonProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Toolbar.Button class={cn(className)} data-slot="toolbar-button" {...restProps}>
  {@render children?.()}
</Toolbar.Button>
