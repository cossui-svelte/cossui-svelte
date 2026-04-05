<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";

  interface Props extends DropdownMenu.TriggerProps {
    children?: Snippet;
  }

  let { children, class: className, ...restProps }: Props = $props();
</script>

<DropdownMenu.Trigger class={className} data-slot="menu-trigger" {...restProps}>
  {@render children?.()}
</DropdownMenu.Trigger>
