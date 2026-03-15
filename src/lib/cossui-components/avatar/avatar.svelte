<script lang="ts">
  import type { Snippet } from "svelte";
  import { Avatar } from "bits-ui";
  import { cn } from "../../utils.js";

  type Props = Avatar.RootProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Avatar.Root
  class={cn(
    "inline-flex size-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-background align-middle font-medium text-xs",
    className,
  )}
  data-slot="avatar"
  {...restProps}
>
  {@render children?.()}
</Avatar.Root>
