<script lang="ts">
  import { ColorPicker } from "$lib/components/ui/colorpicker";

  let color = $state("#4f46e5");

  let swatches = $state<string[]>([
    "#FF3B30",
    "#FF6B2D",
    "#FF9500",
    "#FFC42D",
    "#FFEA00",
    "#A8E62E",
    "#34C759",
    "#2DD4A8",
    "#00C7E6",
    "#0A84FF",
    "#3634DB",
    "#5E5CE6",
    "#AF52DE",
    "#E040A0",
    "#FF2D55",
    "#FF6482",
    "#FF8FAB",
    "#FFB3C6",
  ]);
</script>

<ColorPicker bind:color {swatches} />
