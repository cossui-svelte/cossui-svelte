<script lang="ts">
  import { Tooltip } from "bits-ui";

  interface Props extends Omit<Tooltip.RootProps, "delayDuration"> {
    delay?: number;
  }

  let {
    delay,
    open = $bindable(false),
    triggerId = $bindable(null),
    ...restProps
  }: Props = $props();
</script>

<Tooltip.Root
  bind:open
  bind:triggerId
  delayDuration={delay}
  {...restProps}
/>
