"use client"

import { MapPin } from "lucide-react"
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { useGooglePlacesScript } from "./use-google-places-script"

const DEFAULT_DEBOUNCE_MS = 300

export type SelectedPlace = {
  address: string
  lat: number | null
  lng: number | null
  placeId: string | null
}

type AddressSuggestion = {
  id: string
  label: string
  prediction: google.maps.places.PlacePrediction
}

export type PlacesAutocompleteProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onPlaceSelect: (place: SelectedPlace) => void
  apiKey?: string
  countryCode?: string | null
  debounceMs?: number
  placeholder?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  showPoweredByGoogle?: boolean
}

export function PlacesAutocomplete({
  value,
  defaultValue = "",
  onValueChange,
  onPlaceSelect,
  apiKey,
  countryCode,
  debounceMs = DEFAULT_DEBOUNCE_MS,
  placeholder = "Start typing an address",
  disabled = false,
  className,
  inputClassName,
  showPoweredByGoogle = true,
}: PlacesAutocompleteProps) {
  const listboxId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const requestIdRef = useRef(0)
  const debounceTimeoutRef = useRef<number | null>(null)
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null)

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const inputValue = isControlled ? value : internalValue

  const { isLoaded, error, hasApiKey, GoogleMapsScript } = useGooglePlacesScript({
    apiKey,
  })

  const [open, setOpen] = useState(false)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [selectingId, setSelectingId] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [dropdownRect, setDropdownRect] = useState<{
    top: number
    left: number
    width: number
  } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateDropdownRect = useCallback(() => {
    const input = inputRef.current
    if (!input) {
      return
    }

    const rect = input.getBoundingClientRect()
    setDropdownRect({
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
    })
  }, [])

  useLayoutEffect(() => {
    if (!open) {
      setDropdownRect(null)
      return
    }

    updateDropdownRect()

    window.addEventListener("resize", updateDropdownRect)
    window.addEventListener("scroll", updateDropdownRect, true)

    return () => {
      window.removeEventListener("resize", updateDropdownRect)
      window.removeEventListener("scroll", updateDropdownRect, true)
    }
  }, [open, suggestions.length, updateDropdownRect])

  const setInputValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
    },
    [isControlled, onValueChange],
  )

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current !== null) {
        window.clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  const fetchSuggestions = useCallback(
    async (input: string) => {
      const trimmedInput = input.trim()
      const requestId = requestIdRef.current + 1
      requestIdRef.current = requestId

      if (!trimmedInput || !isLoaded || !window.google?.maps) {
        sessionTokenRef.current = null
        setSuggestions([])
        setOpen(false)
        setActiveIndex(-1)
        return
      }

      setLoadingSuggestions(true)

      try {
        const { AutocompleteSessionToken, AutocompleteSuggestion } =
          await window.google.maps.importLibrary("places")

        if (!AutocompleteSuggestion || requestId !== requestIdRef.current) {
          return
        }

        if (!sessionTokenRef.current) {
          sessionTokenRef.current = new AutocompleteSessionToken()
        }

        const { suggestions: googleSuggestions } =
          await AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: trimmedInput,
            includedRegionCodes: countryCode ? [countryCode] : [],
            region: countryCode ?? "",
            sessionToken: sessionTokenRef.current,
          })

        if (requestId !== requestIdRef.current) {
          return
        }

        const nextSuggestions = googleSuggestions
          .map((suggestion, index) => {
            const prediction = suggestion.placePrediction
            const label = prediction?.text?.text

            if (!prediction || !label) {
              return null
            }

            return {
              id: `${prediction.placeId ?? label}-${index}`,
              label,
              prediction,
            }
          })
          .filter((suggestion): suggestion is AddressSuggestion =>
            Boolean(suggestion),
          )

        setSuggestions(nextSuggestions)
        setOpen(nextSuggestions.length > 0)
        setActiveIndex(nextSuggestions.length > 0 ? 0 : -1)
      } catch {
        setSuggestions([])
        setOpen(false)
        setActiveIndex(-1)
      } finally {
        if (requestId === requestIdRef.current) {
          setLoadingSuggestions(false)
        }
      }
    },
    [countryCode, isLoaded],
  )

  const queueFetchSuggestions = useCallback(
    (input: string) => {
      if (debounceTimeoutRef.current !== null) {
        window.clearTimeout(debounceTimeoutRef.current)
      }

      requestIdRef.current += 1
      setLoadingSuggestions(false)

      if (!input.trim()) {
        sessionTokenRef.current = null
        setSuggestions([])
        setOpen(false)
        setActiveIndex(-1)
        return
      }

      debounceTimeoutRef.current = window.setTimeout(() => {
        debounceTimeoutRef.current = null
        void fetchSuggestions(input)
      }, debounceMs)
    },
    [debounceMs, fetchSuggestions],
  )

  const handleSelectSuggestion = useCallback(
    async (suggestion: AddressSuggestion) => {
      const { prediction } = suggestion
      setSelectingId(suggestion.id)
      setOpen(false)
      setSuggestions([])
      setActiveIndex(-1)
      setInputValue(suggestion.label)

      try {
        const place = prediction.toPlace?.()

        if (!place) {
          onPlaceSelect({
            address: suggestion.label,
            lat: null,
            lng: null,
            placeId: prediction.placeId ?? null,
          })
          return
        }

        await place.fetchFields({
          fields: ["formattedAddress", "location"],
        })

        onPlaceSelect({
          address: place.formattedAddress ?? suggestion.label,
          lat: place.location?.lat() ?? null,
          lng: place.location?.lng() ?? null,
          placeId: prediction.placeId ?? null,
        })
      } catch {
        onPlaceSelect({
          address: suggestion.label,
          lat: null,
          lng: null,
          placeId: prediction.placeId ?? null,
        })
      } finally {
        sessionTokenRef.current = null
        setSelectingId(null)
      }
    },
    [onPlaceSelect, setInputValue],
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((current) =>
        current + 1 >= suggestions.length ? 0 : current + 1,
      )
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((current) =>
        current - 1 < 0 ? suggestions.length - 1 : current - 1,
      )
      return
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault()
      const suggestion = suggestions[activeIndex]
      if (suggestion) {
        void handleSelectSuggestion(suggestion)
      }
      return
    }

    if (event.key === "Escape") {
      event.preventDefault()
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div
      className={cn("relative w-full max-w-xl", className)}
    >
      {GoogleMapsScript ? <GoogleMapsScript /> : null}

      <div className="relative">
        <MapPin className="pointer-events-none absolute top-1/2 left-2.5 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          autoComplete="street-address"
          value={inputValue}
          disabled={disabled || !hasApiKey}
          placeholder={placeholder}
          onChange={(event) => {
            const nextValue = event.target.value
            setInputValue(nextValue)
            queueFetchSuggestions(nextValue)
          }}
          onFocus={() => {
            if (suggestions.length > 0) {
              setOpen(true)
            }
          }}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 120)
          }}
          onKeyDown={handleKeyDown}
          className={cn("pl-9", showPoweredByGoogle && "pr-36", inputClassName)}
        />
        {showPoweredByGoogle ? (
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] font-medium whitespace-nowrap text-muted-foreground">
            Powered by Google
          </span>
        ) : null}
      </div>

      {mounted && open && dropdownRect
        ? createPortal(
            <div
              id={listboxId}
              role="listbox"
              style={{
                position: "fixed",
                top: dropdownRect.top,
                left: dropdownRect.left,
                width: dropdownRect.width,
              }}
              className="z-200 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-xl ring-1 ring-border/50"
            >
              <div className="max-h-64 overflow-y-auto bg-popover p-1">
            {suggestions.map((suggestion, index) => {
              const [primary, ...secondaryParts] = suggestion.label.split(",")
              const secondary = secondaryParts.join(",").trim()
              const isActive = index === activeIndex

              return (
                <button
                  key={suggestion.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => void handleSelectSuggestion(suggestion)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "bg-popover hover:bg-accent",
                  )}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {primary}
                    </span>
                    {secondary ? (
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {secondary}
                      </span>
                    ) : null}
                  </span>
                  {selectingId === suggestion.id ? (
                    <span className="mt-0.5 text-xs text-muted-foreground">
                      Selecting
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
          {loadingSuggestions ? (
                <div className="border-t border-border bg-popover px-3 py-2 text-xs text-muted-foreground">
                  Loading suggestions...
                </div>
              ) : null}
            </div>,
            document.body,
          )
        : null}

      {!hasApiKey ? (
        <p className="mt-1 text-xs text-muted-foreground">
          Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable autocomplete.
        </p>
      ) : null}

      {error ? (
        <p className="mt-1 text-xs text-muted-foreground">
          {error}. You can still enter the address manually.
        </p>
      ) : null}
    </div>
  )
}