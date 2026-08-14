<script lang="ts">
  import BrushIcon from '@lucide/svelte/icons/brush';
  import EraserIcon from '@lucide/svelte/icons/eraser';
  import ScissorsIcon from '@lucide/svelte/icons/scissors';
  import SwatchBookIcon from '@lucide/svelte/icons/swatch-book';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';

  const id = $props.id();

  const items = [
    { checked: true, Icon: SwatchBookIcon, label: 'Palette', value: '1' },
    { Icon: BrushIcon, label: 'Brush', value: '2' },
    { Icon: EraserIcon, label: 'Eraser', value: '3' },
    { Icon: ScissorsIcon, label: 'Cut', value: '4' }
  ];
</script>

<div class="grid grid-cols-2 gap-3">
  {#each items as item (item.value)}
    {@const Icon = item.Icon}
    <div
      class="relative flex cursor-pointer flex-col gap-4 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50"
    >
      <div class="flex justify-between gap-2">
        <Checkbox
          checked={item.checked}
          class="order-1 after:absolute after:inset-0"
          id="{id}-{item.value}"
          value={item.value}
        />
        <Icon aria-hidden="true" class="opacity-60" size={16} />
      </div>
      <Label for="{id}-{item.value}">{item.label}</Label>
    </div>
  {/each}
</div>
