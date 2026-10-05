<script lang="ts">
  import { ColorPicker } from '#lib/components/ui/colorpicker/index.js';

  let color = $state('#4f46e5');
</script>

<ColorPicker bind:color showInputs={false} showColorDropper={false} />
