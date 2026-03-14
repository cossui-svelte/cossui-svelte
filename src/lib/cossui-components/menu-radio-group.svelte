<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";

  type Props = DropdownMenu.RadioGroupProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<DropdownMenu.RadioGroup data-slot="menu-radio-group" {...restProps}>
  {@render children?.()}
</DropdownMenu.RadioGroup>
