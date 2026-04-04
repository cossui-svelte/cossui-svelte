<script lang="ts">
  import type { Snippet } from "svelte";
  import { Select } from "bits-ui";

  type Props = Select.GroupProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Select.Group data-slot="select-group" {...restProps}>
  {@render children?.()}
</Select.Group>
