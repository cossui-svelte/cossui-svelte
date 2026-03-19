<script lang="ts">
  import type { Snippet } from "svelte";
  import { Select } from "bits-ui";

  type Props = Select.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Select.Root {...restProps}>
  {@render children?.()}
</Select.Root>
