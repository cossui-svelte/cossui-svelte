<script lang="ts">
  import Volume1Icon from '@lucide/svelte/icons/volume-1';
  import Volume2Icon from '@lucide/svelte/icons/volume-2';
  import VolumeIcon from '@lucide/svelte/icons/volume';
  import VolumeXIcon from '@lucide/svelte/icons/volume-x';
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldValue
  } from '$lib/components/ui/number-field';
</script>

<NumberField class="w-auto" max={6} min={0} value={3}>
  <div aria-labelledby="volume-control" class="inline-flex items-center" role="group">
    <span class="sr-only" id="volume-control">Volume Control</span>
    <NumberFieldDecrement
      aria-label="Decrease volume"
      class="size-9 rounded-full border border-input bg-popover px-0 shadow-xs/5 hover:bg-accent/50 sm:size-8"
    />
    <NumberFieldValue aria-live="polite" class="px-3">
      {#snippet children({ value })}
        {@const volume = value ?? 0}
        {@const Icon =
          volume === 0
            ? VolumeXIcon
            : volume < 3
              ? VolumeIcon
              : volume < 5
                ? Volume1Icon
                : Volume2Icon}
        <Icon aria-hidden="true" class="opacity-60" size={16} />
        <span aria-label={`Current volume is ${volume}`} class="ms-2">{volume}</span>
      {/snippet}
    </NumberFieldValue>
    <NumberFieldIncrement
      aria-label="Increase volume"
      class="size-9 rounded-full border border-input bg-popover px-0 shadow-xs/5 hover:bg-accent/50 sm:size-8"
    />
  </div>
</NumberField>
