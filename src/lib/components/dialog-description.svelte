<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog } from "bits-ui";
  import { cn } from "../utils.js";

  type Props = Dialog.DescriptionProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Dialog.Description
  class={cn("text-muted-foreground text-sm", className)}
  data-slot="dialog-description"
  {...restProps}
>
  {@render children?.()}
</Dialog.Description>
