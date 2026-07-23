// Minimal ambient shape for the Google Maps JS "places" library (new Autocomplete
// Suggestion API) - just the surface this component actually calls. The `@types/google.maps`
// package isn't a dependency of this project, so these are hand-rolled rather than official.

export interface GooglePlace {
  fetchFields: (options: { fields: string[] }) => Promise<void>;
  formattedAddress?: string;
  location?: { lat: () => number; lng: () => number };
}

export interface GooglePlacePrediction {
  placeId?: string;
  text?: { text: string };
  toPlace?: () => GooglePlace;
}

export interface GoogleAutocompleteSuggestion {
  placePrediction?: GooglePlacePrediction;
}

export type GoogleAutocompleteSessionToken = object;

export interface GooglePlacesLibrary {
  AutocompleteSessionToken: new () => GoogleAutocompleteSessionToken;
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions: (request: {
      includedRegionCodes: string[];
      input: string;
      region: string;
      sessionToken: GoogleAutocompleteSessionToken;
    }) => Promise<{ suggestions: GoogleAutocompleteSuggestion[] }>;
  };
}

declare global {
  interface Window {
    google?: {
      maps?: {
        importLibrary: (library: 'places') => Promise<GooglePlacesLibrary>;
      };
    };
  }
}
