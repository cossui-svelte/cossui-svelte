import Combobox from './combobox.svelte';
import ComboboxChip from './combobox-chip.svelte';
import ComboboxChipRemove from './combobox-chip-remove.svelte';
import ComboboxChips from './combobox-chips.svelte';
import ComboboxChipsInput from './combobox-chips-input.svelte';
import ComboboxClear from './combobox-clear.svelte';
import ComboboxCollection from './combobox-collection.svelte';
import ComboboxEmpty from './combobox-empty.svelte';
import ComboboxGroup from './combobox-group.svelte';
import ComboboxGroupLabel from './combobox-group-label.svelte';
import ComboboxInput from './combobox-input.svelte';
import ComboboxItem from './combobox-item.svelte';
import ComboboxList from './combobox-list.svelte';
import ComboboxPopup from './combobox-popup.svelte';
import ComboboxRow from './combobox-row.svelte';
import ComboboxSeparator from './combobox-separator.svelte';
import ComboboxStatus from './combobox-status.svelte';
import ComboboxTrigger from './combobox-trigger.svelte';
import ComboboxValue from './combobox-value.svelte';

function useComboboxFilter() {
  function contains(itemText: string, inputValue: string) {
    return itemText.toLowerCase().includes(inputValue.toLowerCase());
  }
  function startsWith(itemText: string, inputValue: string) {
    return itemText.toLowerCase().startsWith(inputValue.toLowerCase());
  }
  return { contains, startsWith };
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxRow,
  ComboboxSeparator,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxFilter
};
