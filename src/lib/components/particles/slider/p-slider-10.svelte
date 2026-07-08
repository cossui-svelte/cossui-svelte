<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";

  let value = $state([25, 75]);
</script>

<Slider
  aria-label="Dual thumb slider with collision behavior swap"
  thumbCollisionBehavior="swap"
  bind:value
/>
