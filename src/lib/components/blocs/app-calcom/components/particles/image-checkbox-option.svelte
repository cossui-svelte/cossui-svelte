<script lang="ts" module>
  export interface ImageCheckboxOptionItem {
    label: string;
    value: string;
    imageSrc: string;
  }
</script>

<script lang="ts">
  import { CheckboxGroup } from '#lib/components/ui/checkbox-group/index.js';
  import { Checkbox } from '#lib/components/ui/checkbox/index.js';
  import { FieldItem, FieldLabel } from '#lib/components/ui/field/index.js';

  let {
    items,
    value = $bindable(items.map((i) => i.value)),
    onValueChange,
    defaultItem
  }: {
    items: ImageCheckboxOptionItem[];
    /** Checked items (bindable). Defaults to all items checked. */
    value?: string[];
    onValueChange?: (value: string[]) => void;
    /** Value of the item that is the default. Shows "(default)" after its label when set. */
    defaultItem?: string;
  } = $props();
</script>

<CheckboxGroup class="flex w-full flex-row gap-4 md:gap-6" bind:value {onValueChange}>
  {#each items as item (item.value)}
    <FieldItem class="flex-1">
      <FieldLabel
        class="grid w-full cursor-pointer grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-x-2 gap-y-3 max-sm:grid-cols-1"
      >
        <Checkbox class="peer col-start-1 row-start-2 shrink-0 max-sm:hidden" value={item.value} />
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
          class="col-start-2 row-start-2 flex items-center gap-1 self-center not-peer-data-checked:text-muted-foreground/72 max-sm:col-start-1 max-sm:justify-self-center max-sm:text-center"
        >
          {item.label}
          {#if defaultItem === item.value}
            <span class="font-normal text-muted-foreground">(default)</span>
          {/if}
        </span>
      </FieldLabel>
    </FieldItem>
  {/each}
</CheckboxGroup>
