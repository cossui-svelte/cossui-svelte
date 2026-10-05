<script lang="ts">
  import Field from '$lib/components/ui/field/field.svelte';
  import { Fieldset, FieldsetLegend } from '$lib/components/ui/fieldset';
  import { RadioGroup, RadioPrimitive } from '$lib/components/ui/radio-group';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '$lib/components/ui/tooltip';

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
</script>

<Fieldset class="w-full space-y-3">
  <FieldsetLegend class="font-medium text-sm">Color palette</FieldsetLegend>
  <TooltipProvider>
    <RadioGroup aria-label="Color palette" class="grid grid-cols-4 gap-2" value="dusk">
      {#each palettes as palette (palette.value)}
        <Tooltip disableHoverablePopup>
          <TooltipTrigger as="span" class="flex">
            <RadioPrimitive.Root
              aria-label={palette.label}
              class="flex w-full items-center justify-center rounded-lg border p-2.5 outline-none hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-checked:border-primary/48 data-checked:bg-accent/50"
              value={palette.value}
            >
              <span aria-hidden="true" class="flex shrink-0 -space-x-1">
                {#each palette.colors as color (color)}
                  <span
                    class="size-4 rounded-full ring-1 ring-background"
                    style:background-color={color}
                  ></span>
                {/each}
              </span>
            </RadioPrimitive.Root>
          </TooltipTrigger>
          <TooltipPopup>{palette.label}</TooltipPopup>
        </Tooltip>
      {/each}
    </RadioGroup>
  </TooltipProvider>
</Fieldset>
