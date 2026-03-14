<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog } from "bits-ui";
  import { cn } from "../utils.js";

  type Props = AlertDialog.DescriptionProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<AlertDialog.Description
  class={cn("text-muted-foreground text-sm", className)}
  data-slot="alert-dialog-description"
  {...restProps}
>
  {@render children?.()}
</AlertDialog.Description>
