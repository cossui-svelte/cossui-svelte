export { default as Combobox, getComboboxCtx } from './combobox.svelte';

export function useComboboxFilter(
  filterFn: (value: string, inputValue: string) => boolean = (v, q) =>
    v.toLowerCase().includes(q.toLowerCase())
): (value: string, inputValue: string) => boolean {
  return filterFn;
}
export { default as ComboboxChip } from './combobox-chip.svelte';
export { default as ComboboxChipRemove } from './combobox-chip-remove.svelte';
export { default as ComboboxChips } from './combobox-chips.svelte';
export { default as ComboboxChipsInput } from './combobox-chips-input.svelte';
export { default as ComboboxClear } from './combobox-clear.svelte';
export { default as ComboboxCollection } from './combobox-collection.svelte';
export { default as ComboboxEmpty } from './combobox-empty.svelte';
export { default as ComboboxGroup } from './combobox-group.svelte';
export { default as ComboboxGroupLabel } from './combobox-group-label.svelte';
export { default as ComboboxInput } from './combobox-input.svelte';
export { default as ComboboxItem } from './combobox-item.svelte';
export { default as ComboboxList } from './combobox-list.svelte';
export { default as ComboboxPopup } from './combobox-popup.svelte';
export { default as ComboboxRow } from './combobox-row.svelte';
export { default as ComboboxSeparator } from './combobox-separator.svelte';
export { default as ComboboxStatus } from './combobox-status.svelte';
export { default as ComboboxTrigger } from './combobox-trigger.svelte';
export { default as ComboboxValue } from './combobox-value.svelte';
