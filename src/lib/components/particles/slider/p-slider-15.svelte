<script lang="ts">
  import { Slider } from "$lib/components/ui/slider";

  const min = 5;
  const max = 1240;

  let values = $state([min, max]);

  function formatPrice(price: number) {
    return price === max ? `$${price.toLocaleString()}+` : `$${price.toLocaleString()}`;
  }
</script>

<fieldset class="flex w-full flex-col gap-3 border-0 p-0 m-0">
  <legend class="tabular-nums text-sm font-medium">
    From {formatPrice(values[0] ?? min)} to {formatPrice(values[1] ?? max)}
  </legend>
  <Slider
    aria-label="Price range"
    class="flex-1"
    {max}
    {min}
    name="price-range"
    bind:value={values}
  />
</fieldset>
