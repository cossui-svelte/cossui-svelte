<script lang="ts">
  import {ColorPicker} from "$lib/components/ui/colorpicker";

  let hex = $state("#4f46e5");
</script>

<ColorPicker bind:hex showInputs={false} showColorDropper={false} label="Pick a color" />
