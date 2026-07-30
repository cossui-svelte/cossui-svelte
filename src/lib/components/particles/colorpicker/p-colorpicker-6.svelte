<script lang="ts">
  import {ColorPicker} from "$lib/components/ui/colorpicker";

  let color = $state("#4f46e5");
</script>

<ColorPicker
  bind:color
  swatches={["#ef4444", "#f97316", "#eab308", "#22c55e", "#4f46e5", "#a855f7"]}
  showInputs={false}
/>
