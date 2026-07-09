<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import type { Snippet } from "svelte";

  interface Props extends DropdownMenu.RadioGroupProps {
    children?: Snippet;
  }

  let { children, value = $bindable(undefined), ...restProps }: Props = $props();
</script>

<DropdownMenu.RadioGroup bind:value data-slot="menu-radio-group" {...restProps}>
  {@render children?.()}
</DropdownMenu.RadioGroup>
