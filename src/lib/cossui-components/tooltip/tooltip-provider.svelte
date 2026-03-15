<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip } from "bits-ui";

  type Props = Tooltip.ProviderProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Tooltip.Provider {...restProps}>
  {@render children?.()}
</Tooltip.Provider>
