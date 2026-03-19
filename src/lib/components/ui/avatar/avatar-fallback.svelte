<script lang="ts">
  import type { Snippet } from "svelte";
  import { Avatar } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = Avatar.FallbackProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Avatar.Fallback
  class={cn(
    "flex size-full items-center justify-center rounded-full bg-muted",
    className,
  )}
  data-slot="avatar-fallback"
  {...restProps}
>
  {@render children?.()}
</Avatar.Fallback>
