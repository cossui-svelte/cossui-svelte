<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";

  interface Props extends DropdownMenu.RadioGroupProps {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<DropdownMenu.RadioGroup data-slot="menu-radio-group" {...restProps}>
  {@render children?.()}
</DropdownMenu.RadioGroup>
