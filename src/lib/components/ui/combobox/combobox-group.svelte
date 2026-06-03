<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = Combobox.GroupProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Combobox.Group
  class={cn("[[role=group]+&]:mt-1.5", className)}
  data-slot="combobox-group"
  {...restProps}
>
  {@render children?.()}
</Combobox.Group>
