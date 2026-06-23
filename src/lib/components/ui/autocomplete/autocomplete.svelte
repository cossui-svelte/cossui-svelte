<script lang="ts">
  import { Combobox } from "bits-ui";
  import type { Snippet } from "svelte";

  type Props = Combobox.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Combobox.Root {...restProps}>
  {@render children?.()}
</Combobox.Root>
