<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog } from "bits-ui";
  import { cn } from "../../utils.js";

  type Props = AlertDialog.TitleProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<AlertDialog.Title
  class={cn("font-heading font-semibold text-xl leading-none", className)}
  data-slot="alert-dialog-title"
  {...restProps}
>
  {@render children?.()}
</AlertDialog.Title>
