import Autocomplete from "./autocomplete.svelte";
import AutocompleteInput from "./autocomplete-input.svelte";
import AutocompleteTrigger from "./autocomplete-trigger.svelte";
import AutocompletePopup from "./autocomplete-popup.svelte";
import AutocompleteItem from "./autocomplete-item.svelte";
import AutocompleteSeparator from "./autocomplete-separator.svelte";
import AutocompleteGroup from "./autocomplete-group.svelte";
import AutocompleteGroupLabel from "./autocomplete-group-label.svelte";
import AutocompleteEmpty from "./autocomplete-empty.svelte";
import AutocompleteValue from "./autocomplete-value.svelte";
import AutocompleteList from "./autocomplete-list.svelte";
import AutocompleteClear from "./autocomplete-clear.svelte";
import AutocompleteStatus from "./autocomplete-status.svelte";
import AutocompleteRow from "./autocomplete-row.svelte";
import AutocompleteCollection from "./autocomplete-collection.svelte";

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
  AutocompleteInput,
  AutocompleteTrigger,
  AutocompletePopup,
  AutocompleteItem,
  AutocompleteSeparator,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteEmpty,
  AutocompleteValue,
  AutocompleteList,
  AutocompleteClear,
  AutocompleteStatus,
  AutocompleteRow,
  AutocompleteCollection,
  useAutocompleteFilter,
};
