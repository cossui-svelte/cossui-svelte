<script lang="ts">
  import {
    Select,
    SelectItem,
    SelectLabel,
    SelectPopup,
    SelectTrigger
  } from '#lib/components/ui/select/index.js';

  const palettes = [
    { label: 'Mono', value: 'mono', colors: ['#18181B', '#A1A1AA', '#FAFAFA'] },
    { label: 'Porcelain', value: 'porcelain', colors: ['#AA8F73', '#C8B79A', '#889FA3'] },
    { label: 'Ember', value: 'ember', colors: ['#B94724', '#DB8649', '#EDD0A0'] },
    { label: 'Terra', value: 'terra', colors: ['#A64F3C', '#C78F70', '#896577'] },
    { label: 'Rosé', value: 'rose', colors: ['#9B3F60', '#C98693', '#E9B9A5'] },
    { label: 'Dusk', value: 'dusk', colors: ['#BE835B', '#8E7C9F', '#6E97AE'] },
    { label: 'Orchard', value: 'orchard', colors: ['#63794B', '#ADA66B', '#83A18A'] },
    { label: 'Petrol', value: 'petrol', colors: ['#326A76', '#C97868', '#C9AD81'] },
    { label: 'Lagoon', value: 'lagoon', colors: ['#247E92', '#4CAFA3', '#B6D8C7'] },
    { label: 'Borealis', value: 'borealis', colors: ['#267F69', '#527FB8', '#9A83BF'] },
    { label: 'Cobalt', value: 'cobalt', colors: ['#244E9A', '#607DA9', '#B5C9DD'] },
    { label: 'Iris', value: 'iris', colors: ['#7361A3', '#AC87A5', '#DBC3CA'] }
  ];

  let selected = $state('dusk');
  const selectedPalette = $derived(palettes.find((p) => p.value === selected) ?? palettes[0]);
</script>

{#snippet swatches(colors: string[])}
  <span aria-hidden="true" class="flex shrink-0 -space-x-1">
    {#each colors as color (color)}
      <span class="size-4 rounded-full ring-1 ring-background" style:background-color={color}
      ></span>
    {/each}
  </span>
{/snippet}

<Select
  value={selected}
  onValueChange={(v) => {
    selected = v;
  }}
>
  <SelectLabel>Color palette</SelectLabel>
  <SelectTrigger aria-label="Color palette">
    <span class="flex flex-1 items-center gap-2">
      {@render swatches(selectedPalette.colors)}
      <span class="truncate">{selectedPalette.label}</span>
    </span>
  </SelectTrigger>
  <SelectPopup>
    {#each palettes as palette (palette.value)}
      <SelectItem value={palette.value}>
        <span class="flex items-center gap-2">
          {@render swatches(palette.colors)}
          {palette.label}
        </span>
      </SelectItem>
    {/each}
  </SelectPopup>
</Select>
