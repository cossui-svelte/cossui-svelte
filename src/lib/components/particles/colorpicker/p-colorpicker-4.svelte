<script>
  import { ColorPicker } from '$lib/components/ui/colorpicker';

  let color = $state('#1d916bb8');
</script>

<ColorPicker bind:color showInputs={false} showColorDropper={false} showSaturationArea={false} />
