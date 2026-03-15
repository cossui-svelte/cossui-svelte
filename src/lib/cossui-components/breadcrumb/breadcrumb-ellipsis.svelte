<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { MoreHorizontal } from "lucide-svelte";
  import { cn } from "../../utils.js";

  interface Props extends HTMLAttributes<HTMLSpanElement> {}

  let { class: className, ...restProps }: Props = $props();
</script>

<span
  aria-hidden="true"
  class={cn(className)}
  data-slot="breadcrumb-ellipsis"
  role="presentation"
  {...restProps}
>
  <MoreHorizontal class="size-4" />
  <span class="sr-only">More</span>
</span>
