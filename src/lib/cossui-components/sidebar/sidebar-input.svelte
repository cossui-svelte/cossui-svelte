<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import Input from "./input.svelte";
  import { cn } from "../../utils.js";

  interface Props extends Omit<HTMLInputAttributes, "size"> {
    size?: "sm" | "default" | "lg" | number;
    unstyled?: boolean;
  }

  let { class: className, ...restProps }: Props = $props();
</script>

<Input
  class={cn("h-8 w-full bg-background shadow-none", className)}
  data-sidebar="input"
  data-slot="sidebar-input"
  {...restProps}
/>
