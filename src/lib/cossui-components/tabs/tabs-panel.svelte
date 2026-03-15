<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tabs } from "bits-ui";
  import { cn } from "../../utils.js";

  type Props = Tabs.ContentProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Tabs.Content
  class={cn("flex-1 outline-none", className)}
  data-slot="tabs-content"
  {...restProps}
>
  {@render children?.()}
</Tabs.Content>
