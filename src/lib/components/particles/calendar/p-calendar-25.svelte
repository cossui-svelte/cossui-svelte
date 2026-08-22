<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
  import ClockIcon from '@lucide/svelte/icons/clock';
  import {
    Autocomplete,
    AutocompleteCollection,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup
  } from '$lib/components/ui/autocomplete';
  import { Button } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';

  const times = Array.from({ length: 96 }, (_, i) => {
    const hours = String(Math.floor(i / 4)).padStart(2, '0');
    const minutes = String((i % 4) * 15).padStart(2, '0');
    return `${hours}:${minutes}`;
  });

  function parseTime(value: string): string | null {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }

    const colonMatch = /^(\d{1,2}):(\d{1,2})$/.exec(trimmed);
    if (colonMatch) {
      const hours = Number(colonMatch[1]);
      const minutes = Number(colonMatch[2]);
      if (hours > 23 || minutes > 59) {
        return null;
      }
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    const digits = trimmed.replace(/\D/g, '');
    if (digits.length === 0 || digits.length > 4) {
      return null;
    }

    let hours: number;
    let minutes: number;

    if (digits.length <= 2) {
      hours = Number(digits);
      minutes = 0;
    } else if (digits.length === 3) {
      // HMM → H:MM (215 → 02:15)
      hours = Number(digits[0]);
      minutes = Number(digits.slice(1));
    } else {
      // HHMM → HH:MM (2150 → 21:50)
      hours = Number(digits.slice(0, 2));
      minutes = Number(digits.slice(2));
    }

    if (hours > 23 || minutes > 59) {
      return null;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  function filterTime(item: string, query: string): boolean {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return true;
    }

    if (item.toLowerCase().startsWith(trimmed)) {
      return true;
    }

    const itemDigits = item.replace(/\D/g, '');
    const queryDigits = trimmed.replace(/\D/g, '');
    if (!queryDigits) {
      return false;
    }

    const itemHour = Number(itemDigits.slice(0, 2));
    const itemMinutes = itemDigits.slice(2);
    // Padded "0615" and unpadded "615" so "61" matches 06:15 while typing toward 615
    const itemDigitsUnpadded = `${itemHour}${itemMinutes}`;

    if (itemDigits.startsWith(queryDigits) || itemDigitsUnpadded.startsWith(queryDigits)) {
      return true;
    }

    if (queryDigits.length >= 3) {
      const normalized = parseTime(queryDigits);
      return normalized === item;
    }

    const queryHour = Number(queryDigits);

    if (trimmed.includes(':')) {
      const minuteQuery = trimmed.split(':')[1]?.replace(/\D/g, '') ?? '';
      return itemHour === queryHour && (!minuteQuery || itemMinutes.startsWith(minuteQuery));
    }

    if (queryDigits.length === 1) {
      return itemHour === queryHour || String(itemHour).startsWith(queryDigits);
    }

    return queryHour <= 23 && itemHour === queryHour;
  }

  const todayValue = today(getLocalTimeZone());
  let value = $state<DateValue | undefined>(todayValue);
  let placeholder = $state<DateValue>(todayValue);
  let time = $state('12:00');
  let filterQuery = $state('');
  let loading = $state(false);

  const matchingTimes = $derived(
    times
      .filter((item) => filterTime(item, filterQuery))
      .map((item) => ({ label: item, value: item }))
  );

  function handleValueChange(next: string) {
    time = next;
    filterQuery = '';
  }

  function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
    filterQuery = e.currentTarget.value;
  }

  function handleFocus(e: FocusEvent & { currentTarget: HTMLInputElement }) {
    e.currentTarget.select();
  }

  function handleBlur(e: FocusEvent & { currentTarget: HTMLInputElement }) {
    const normalized = parseTime(e.currentTarget.value);
    time = normalized ?? time;
    e.currentTarget.value = time;
    filterQuery = '';
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Date: ${value ? value.toString() : ''}\nTime: ${time}`);
  }
</script>

<Form class="flex w-fit flex-col gap-2" onsubmit={handleSubmit}>
  <Field class="gap-2" name="date">
    <Calendar bind:value bind:placeholder mode="single" />
    <FieldError />
  </Field>
  <Field class="w-0 min-w-full gap-2" name="time">
    <div class="flex flex-row items-center gap-3">
      <FieldLabel class="whitespace-nowrap text-xs">Enter time</FieldLabel>
      <Autocomplete autoHighlight filter={null} items={matchingTimes} value={time}>
        <AutocompleteInput
          aria-label="Enter time"
          inputmode="numeric"
          maxlength={5}
          onblur={handleBlur}
          onfocus={handleFocus}
          oninput={handleInput}
          placeholder="HH:mm"
        >
          {#snippet startAddon()}
            <ClockIcon aria-hidden="true" />
          {/snippet}
        </AutocompleteInput>
        <AutocompletePopup class={matchingTimes.length === 0 ? 'hidden' : undefined}>
          <AutocompleteList>
            <AutocompleteCollection>
              {#snippet children(item: { label: string; value: string })}
                <AutocompleteItem value={item} onclick={() => handleValueChange(item.value)}>
                  {item.label}
                </AutocompleteItem>
              {/snippet}
            </AutocompleteCollection>
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
    <FieldError />
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
