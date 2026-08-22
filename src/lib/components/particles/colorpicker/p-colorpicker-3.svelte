<script lang="ts">
  import { hueyColor } from '@hueycolor/core';
  import { ColorPicker } from '$lib/components/ui/colorpicker';

  // generate a random color
  let color = $state(hueyColor('#999').randomize());
</script>

<ColorPicker
  bind:color
  showInputs={false}
  showColorDropper={false}
  showSaturationArea={false}
  showColorSliders={false}
  swatchesEditable={false}
  swatches={['#ef4444', '#f97316', '#eab308', '#22c55e', '#4f46e5', '#a855f7']}
/>
