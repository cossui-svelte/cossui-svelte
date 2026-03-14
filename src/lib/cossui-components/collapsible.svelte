<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible } from "bits-ui";

  type Props = Collapsible.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Collapsible.Root data-slot="collapsible" {...restProps}>
  {@render children?.()}
</Collapsible.Root>
