<script lang="ts">
  import MapPin from '@lucide/svelte/icons/map-pin';
  import {
    Autocomplete,
    AutocompleteCollection,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup,
    AutocompleteStatus
  } from '$lib/components/ui/autocomplete';
  import { cn } from '$lib/utils';
  import {
    type AddressSuggestion,
    PlacesAutocompleteState,
    type SelectedPlace
  } from './places-autocomplete-state.svelte.js';
  import { GooglePlacesScript } from './use-google-places-script.svelte.js';

  const DEFAULT_DEBOUNCE_MS = 300;

  interface Props {
    apiKey?: string;
    class?: string;
    countryCode?: string | null;
    debounceMs?: number;
    defaultValue?: string;
    disabled?: boolean;
    inputClass?: string;
    onPlaceSelect: (place: SelectedPlace) => void;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    showPoweredByGoogle?: boolean;
    value?: string;
  }

  let {
    apiKey,
    class: className,
    countryCode,
    debounceMs = DEFAULT_DEBOUNCE_MS,
    defaultValue = '',
    disabled = false,
    inputClass,
    onPlaceSelect,
    onValueChange,
    placeholder = 'Start typing an address',
    showPoweredByGoogle = true,
    value = $bindable()
  }: Props = $props();

  let internalValue = $state(defaultValue);
  const isControlled = $derived(value !== undefined);
  const inputValue = $derived(isControlled ? (value ?? '') : internalValue);

  function setInputValue(nextValue: string) {
    if (!isControlled) {
      internalValue = nextValue;
    }
    value = nextValue;
    onValueChange?.(nextValue);
  }

  const googlePlacesScript = new GooglePlacesScript({
    apiKey: () => apiKey
  });

  const autocompleteState = new PlacesAutocompleteState({
    countryCode: () => countryCode,
    debounceMs: () => debounceMs,
    isLoaded: () => googlePlacesScript.isLoaded,
    onPlaceSelect,
    onValueChange: setInputValue
  });

  $effect(() => () => autocompleteState.destroy());
</script>

<div class={cn('relative w-full max-w-xl', className)}>
  <Autocomplete
    autoHighlight
    filter={null}
    items={autocompleteState.suggestions}
    itemToStringValue={(suggestion: AddressSuggestion) => suggestion.label}
    onOpenChange={(next) => {
      autocompleteState.open = next && autocompleteState.suggestions.length > 0;
    }}
    open={autocompleteState.open}
    value={inputValue}
  >
    <div class="relative">
      <AutocompleteInput
        class={cn(showPoweredByGoogle && 'pr-28', inputClass)}
        disabled={disabled || !googlePlacesScript.hasApiKey}
        oninput={(event) => {
          const nextValue = event.currentTarget.value;
          setInputValue(nextValue);
          autocompleteState.queueFetchSuggestions(nextValue);
        }}
        {placeholder}
      >
        {#snippet startAddon()}
          <MapPin />
        {/snippet}
      </AutocompleteInput>
      {#if showPoweredByGoogle}
        <span
          class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] font-medium whitespace-nowrap text-muted-foreground"
        >
          Powered by Google
        </span>
      {/if}
    </div>

    <AutocompletePopup>
      <AutocompleteList>
        <AutocompleteCollection>
          {#snippet children(suggestion: AddressSuggestion)}
            {@const [primary, ...secondaryParts] = suggestion.label.split(',')}
            {@const secondary = secondaryParts.join(',').trim()}
            <AutocompleteItem
              value={suggestion}
              onclick={() => autocompleteState.selectSuggestion(suggestion)}
            >
              <span class="flex w-full items-start gap-3">
                <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span class="min-w-0 flex-1">
                  <span class="block truncate font-medium">{primary}</span>
                  {#if secondary}
                    <span class="mt-0.5 block truncate text-xs text-muted-foreground">
                      {secondary}
                    </span>
                  {/if}
                </span>
                {#if autocompleteState.selectingId === suggestion.id}
                  <span class="mt-0.5 text-xs text-muted-foreground">Selecting</span>
                {/if}
              </span>
            </AutocompleteItem>
          {/snippet}
        </AutocompleteCollection>
      </AutocompleteList>
      {#if autocompleteState.loadingSuggestions}
        <AutocompleteStatus>Loading suggestions...</AutocompleteStatus>
      {/if}
    </AutocompletePopup>
  </Autocomplete>

  {#if !googlePlacesScript.hasApiKey}
    <p class="mt-1 text-xs text-muted-foreground">Pass an apiKey to enable autocomplete.</p>
  {/if}

  {#if googlePlacesScript.error}
    <p class="mt-1 text-xs text-muted-foreground">
      {googlePlacesScript.error}. You can still enter the address manually.
    </p>
  {/if}
</div>
