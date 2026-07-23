import type {
  GoogleAutocompleteSessionToken,
  GooglePlacePrediction,
} from "./places-types.js";

export type SelectedPlace = {
  address: string;
  lat: number | null;
  lng: number | null;
  placeId: string | null;
};

export type AddressSuggestion = {
  id: string;
  label: string;
  prediction: GooglePlacePrediction;
};

export interface PlacesAutocompleteStateOptions {
  countryCode: () => string | null | undefined;
  debounceMs: () => number;
  isLoaded: () => boolean;
  onPlaceSelect: (place: SelectedPlace) => void;
  onValueChange: (value: string) => void;
}

/** Headless suggestion-fetching/selection logic, driven by the new Places Autocomplete API. */
export class PlacesAutocompleteState {
  suggestions = $state<AddressSuggestion[]>([]);
  open = $state(false);
  loadingSuggestions = $state(false);
  selectingId = $state<string | null>(null);

  #options: PlacesAutocompleteStateOptions;
  #requestId = 0;
  #debounceTimeout: ReturnType<typeof setTimeout> | null = null;
  #sessionToken: GoogleAutocompleteSessionToken | null = null;

  constructor(options: PlacesAutocompleteStateOptions) {
    this.#options = options;
  }

  destroy(): void {
    if (this.#debounceTimeout !== null) {
      clearTimeout(this.#debounceTimeout);
    }
  }

  queueFetchSuggestions(input: string): void {
    if (this.#debounceTimeout !== null) {
      clearTimeout(this.#debounceTimeout);
    }

    this.#requestId += 1;
    this.loadingSuggestions = false;

    if (!input.trim()) {
      this.#sessionToken = null;
      this.suggestions = [];
      this.open = false;
      return;
    }

    this.#debounceTimeout = setTimeout(() => {
      this.#debounceTimeout = null;
      void this.#fetchSuggestions(input);
    }, this.#options.debounceMs());
  }

  async #fetchSuggestions(input: string): Promise<void> {
    const trimmedInput = input.trim();
    const requestId = ++this.#requestId;

    if (!trimmedInput || !this.#options.isLoaded() || !window.google?.maps) {
      this.#sessionToken = null;
      this.suggestions = [];
      this.open = false;
      return;
    }

    this.loadingSuggestions = true;

    try {
      const { AutocompleteSessionToken, AutocompleteSuggestion } =
        await window.google.maps.importLibrary("places");

      if (!AutocompleteSuggestion || requestId !== this.#requestId) {
        return;
      }

      if (!this.#sessionToken) {
        this.#sessionToken = new AutocompleteSessionToken();
      }

      const countryCode = this.#options.countryCode();
      const { suggestions: googleSuggestions } =
        await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: trimmedInput,
          includedRegionCodes: countryCode ? [countryCode] : [],
          region: countryCode ?? "",
          sessionToken: this.#sessionToken,
        });

      if (requestId !== this.#requestId) {
        return;
      }

      const nextSuggestions = googleSuggestions
        .map((suggestion, index) => {
          const prediction = suggestion.placePrediction;
          const label = prediction?.text?.text;

          if (!prediction || !label) {
            return null;
          }

          return {
            id: `${prediction.placeId ?? label}-${index}`,
            label,
            prediction,
          };
        })
        .filter((suggestion): suggestion is AddressSuggestion => Boolean(suggestion));

      this.suggestions = nextSuggestions;
      this.open = nextSuggestions.length > 0;
    } catch {
      this.suggestions = [];
      this.open = false;
    } finally {
      if (requestId === this.#requestId) {
        this.loadingSuggestions = false;
      }
    }
  }

  findSuggestion(id: string): AddressSuggestion | undefined {
    return this.suggestions.find((suggestion) => suggestion.id === id);
  }

  async selectSuggestion(suggestion: AddressSuggestion): Promise<void> {
    const { prediction } = suggestion;
    this.selectingId = suggestion.id;
    this.open = false;
    this.suggestions = [];
    this.#options.onValueChange(suggestion.label);

    try {
      const place = prediction.toPlace?.();

      if (!place) {
        this.#options.onPlaceSelect({
          address: suggestion.label,
          lat: null,
          lng: null,
          placeId: prediction.placeId ?? null,
        });
        return;
      }

      await place.fetchFields({ fields: ["formattedAddress", "location"] });

      this.#options.onPlaceSelect({
        address: place.formattedAddress ?? suggestion.label,
        lat: place.location?.lat() ?? null,
        lng: place.location?.lng() ?? null,
        placeId: prediction.placeId ?? null,
      });
    } catch {
      this.#options.onPlaceSelect({
        address: suggestion.label,
        lat: null,
        lng: null,
        placeId: prediction.placeId ?? null,
      });
    } finally {
      this.#sessionToken = null;
      this.selectingId = null;
    }
  }
}
