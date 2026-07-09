<script lang="ts">
  import { Tooltip } from "bits-ui";
  import type { Snippet } from "svelte";

  interface Props extends Omit<Tooltip.ProviderProps, "delayDuration"> {
    children?: Snippet;
    delay?: number;
  }

  let { delay, ...restProps }: Props = $props();
</script>

<Tooltip.Provider delayDuration={delay} {...restProps} />
