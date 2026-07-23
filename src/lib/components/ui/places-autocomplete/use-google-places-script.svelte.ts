// import "./places-types.js";

const SCRIPT_ID = "google-maps-places-script";

let scriptPromise: Promise<void> | null = null;

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (window.google?.maps?.importLibrary) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load the Google Maps script")),
      );
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=beta&loading=async`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load the Google Maps script"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export interface GooglePlacesScriptOptions {
  apiKey: () => string | undefined;
}

/** Lazily loads the Google Maps "places" library and tracks its ready state. */
export class GooglePlacesScript {
  isLoaded = $state(false);
  error = $state<string | null>(null);

  #options: GooglePlacesScriptOptions;

  constructor(options: GooglePlacesScriptOptions) {
    this.#options = options;

    $effect(() => {
      const apiKey = this.#options.apiKey();

      if (!apiKey) {
        this.isLoaded = false;
        this.error = null;
        return;
      }

      if (window.google?.maps?.importLibrary) {
        this.isLoaded = true;
        this.error = null;
        return;
      }

      let cancelled = false;

      loadGoogleMapsScript(apiKey)
        .then(() => {
          if (!cancelled) {
            this.isLoaded = true;
            this.error = null;
          }
        })
        .catch(() => {
          if (!cancelled) {
            this.error = "Failed to load Google Maps";
          }
        });

      return () => {
        cancelled = true;
      };
    });
  }

  get hasApiKey(): boolean {
    const k=this.#options.apiKey()
    return k !== undefined && k.trim().length > 10;
  }
}
