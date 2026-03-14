<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox } from "bits-ui";

  type Props = Combobox.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Combobox.Root {...restProps}>
  {@render children?.()}
</Combobox.Root>
