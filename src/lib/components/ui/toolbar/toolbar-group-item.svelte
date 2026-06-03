<script lang="ts">
  import type { Snippet } from "svelte";
  import { Toolbar } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = Toolbar.GroupItemProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Toolbar.GroupItem
  class={cn(className)}
  data-slot="toolbar-group-item"
  {...restProps}
>
  {@render children?.()}
</Toolbar.GroupItem>
