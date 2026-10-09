<script lang="ts" module>
  export interface ImageRadioOptionItem {
    label: string;
    value: string;
    imageSrc: string;
  }
</script>

<script lang="ts">
  import { FieldItem, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Radio, RadioGroup } from '#lib/components/ui/radio-group/index.js';

  let { items, value = $bindable() }: { items: ImageRadioOptionItem[]; value?: string } = $props();
</script>

<RadioGroup class="flex w-full flex-row gap-4 md:gap-6" bind:value>
  {#each items as item (item.value)}
    <FieldItem class="flex-1">
      <FieldLabel
        class="grid w-full cursor-pointer grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-x-2 gap-y-3 max-sm:grid-cols-1"
      >
        <Radio class="peer col-start-1 row-start-2 shrink-0 max-sm:hidden" value={item.value} />
        <span
          class="relative col-span-2 row-start-1 block aspect-208/120 w-full min-w-0 overflow-hidden rounded-lg not-peer-data-checked:opacity-80 shadow-xs transition-[box-shadow,opacity] peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-64 peer-data-checked:ring-2 peer-data-checked:ring-primary peer-data-checked:ring-offset-1 peer-data-checked:ring-offset-background max-sm:col-span-1"
        >
          <img
            alt={item.label}
            class="absolute inset-0 h-full w-full object-cover object-center shadow-xs"
            src={item.imageSrc}
          />
        </span>
        <span
          class="col-start-2 row-start-2 self-center not-peer-data-checked:text-muted-foreground/72 max-sm:col-start-1 max-sm:justify-self-center max-sm:text-center"
        >
          {item.label}
        </span>
      </FieldLabel>
    </FieldItem>
  {/each}
</RadioGroup>
