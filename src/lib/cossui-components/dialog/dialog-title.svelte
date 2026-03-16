<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = Dialog.TitleProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Dialog.Title
  class={cn("font-heading font-semibold text-xl leading-none", className)}
  data-slot="dialog-title"
  {...restProps}
>
  {@render children?.()}
</Dialog.Title>
