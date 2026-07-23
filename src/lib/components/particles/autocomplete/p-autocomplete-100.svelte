<script lang="ts">
    import {
        PlacesAutocomplete,
        type SelectedPlace,
    } from "$lib/components/ui/places-autocomplete";
    import { toastManager } from "$lib/components/ui/toast";

    import { GOOGLE_MAPS_API_KEY } from "$app/env/public";

    const countryCode = "us";
    let selected = $state<SelectedPlace | null>(null);
</script>

<div class="flex w-full flex-col items-center gap-4 md:gap-6">
    <div class="w-full max-w-xl">
        <PlacesAutocomplete
            // use your own Google Maps API key here, or set it in your environment variables as VITE_GOOGLE_MAPS_API_KEY
            apiKey={GOOGLE_MAPS_API_KEY}
            {countryCode}
            placeholder={countryCode
                ? `Search addresses in ${countryCode.toUpperCase()}`
                : "Start typing an address"}
            onPlaceSelect={(place) => {
                selected = place;
                toastManager.success("Place selected", {
                    description:
                        place.lat != null && place.lng != null
                            ? `${place.address} (${place.lat.toFixed(5)}, ${place.lng.toFixed(5)})`
                            : place.address,
                });
            }}
        />
    </div>
    {#if selected}
        <p class="max-w-xl text-center text-xs text-muted-foreground">
            Selected: {selected.address}
            {selected.placeId ? ` · ${selected.placeId}` : ""}
        </p>
    {/if}
</div>
