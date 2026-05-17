import Autocomplete from './autocomplete.svelte';
import AutocompleteClear from './autocomplete-clear.svelte';
import AutocompleteCollection from './autocomplete-collection.svelte';
import AutocompleteEmpty from './autocomplete-empty.svelte';
import AutocompleteGroup from './autocomplete-group.svelte';
import AutocompleteGroupLabel from './autocomplete-group-label.svelte';
import AutocompleteInput from './autocomplete-input.svelte';
import AutocompleteItem from './autocomplete-item.svelte';
import AutocompleteList from './autocomplete-list.svelte';
import AutocompletePopup from './autocomplete-popup.svelte';
import AutocompleteRow from './autocomplete-row.svelte';
import AutocompleteSeparator from './autocomplete-separator.svelte';
import AutocompleteStatus from './autocomplete-status.svelte';
import AutocompleteTrigger from './autocomplete-trigger.svelte';
import AutocompleteValue from './autocomplete-value.svelte';

function useAutocompleteFilter() {
  function contains(itemText: string, inputValue: string) {
    return itemText.toLowerCase().includes(inputValue.toLowerCase());
  }
  function startsWith(itemText: string, inputValue: string) {
    return itemText.toLowerCase().startsWith(inputValue.toLowerCase());
  }
  return { contains, startsWith };
}

export {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteRow,
  AutocompleteSeparator,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
  useAutocompleteFilter
};
