<script lang="ts">
  import { ColorPicker } from '$lib/components/ui/colorpicker';
  import { hueyColor } from '@hueycolor/core';

  // generate a random color
  let color = $state(hueyColor('#999').randomize());
</script>

<ColorPicker
  bind:color
  swatches={['#ef4444', '#f97316', '#eab308', '#22c55e', '#4f46e5', '#a855f7']}
/>
