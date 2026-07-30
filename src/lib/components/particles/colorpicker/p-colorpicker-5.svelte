<script lang="ts">
  import {ColorPicker} from "$lib/components/ui/colorpicker";

  let hex = $state("#1d916bb8");

  let rgb = {
    r: 29,
    g: 145,
    b: 107,
    a: 0.72,
  };

  let hsv = {
    h: 160,
    s: 80,
    v: 57.04296875,
    a: 0.72,
  };

</script>

<ColorPicker swatches={["#ef4444", "#f97316", "#eab308", "#22c55e", "#4f46e5", "#a855f7"]} />