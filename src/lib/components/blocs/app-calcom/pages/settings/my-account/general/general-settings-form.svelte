<script lang="ts">
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import SearchIcon from '@lucide/svelte/icons/search';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Combobox,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxTrigger,
    ComboboxValue
  } from '#lib/components/ui/combobox/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Fieldset, FieldsetLegend } from '#lib/components/ui/fieldset/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
    selectTriggerVariants
  } from '#lib/components/ui/select/index.js';
  import { cn } from '#lib/utils.js';
  import { FieldGrid, FieldGridRow } from '../../../../components/particles/index.js';

  const languageItems = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' }
  ];

  const timezones = Intl.supportedValuesOf('timeZone');

  const formattedTimezones = timezones
    .map((timezone) => {
      const formatter = new Intl.DateTimeFormat('en', {
        timeZone: timezone,
        timeZoneName: 'shortOffset'
      });
      const parts = formatter.formatToParts(new Date());
      const offset = parts.find((part) => part.type === 'timeZoneName')?.value || '';
      const modifiedOffset = offset === 'GMT' ? 'GMT+0' : offset;

      const offsetMatch = offset.match(/GMT([+-]?)(\d+)(?::(\d+))?/);
      const sign = offsetMatch?.[1] === '-' ? -1 : 1;
      const hours = Number.parseInt(offsetMatch?.[2] || '0', 10);
      const minutes = Number.parseInt(offsetMatch?.[3] || '0', 10);
      const totalMinutes = sign * (hours * 60 + minutes);

      return {
        label: `(${modifiedOffset}) ${timezone.replace(/_/g, ' ')}`,
        numericOffset: totalMinutes,
        value: timezone
      };
    })
    .sort((a, b) => a.numericOffset - b.numericOffset);

  const timezoneItems = formattedTimezones.map(({ label, value }) => ({ label, value }));

  const defaultTimezone = (
    formattedTimezones.find((tz) => tz.value === 'Europe/Rome') ?? formattedTimezones[0]
  )?.value;

  const timeFormatItems = [
    { label: '12-hour', value: '12' },
    { label: '24-hour', value: '24' }
  ];

  const startOfWeekItems = [
    { label: 'Sunday', value: 'sunday' },
    { label: 'Monday', value: 'monday' },
    { label: 'Tuesday', value: 'tuesday' },
    { label: 'Wednesday', value: 'wednesday' },
    { label: 'Thursday', value: 'thursday' },
    { label: 'Friday', value: 'friday' },
    { label: 'Saturday', value: 'saturday' }
  ];
</script>

<FieldGrid>
  <Field>
    <FieldLabel>Language</FieldLabel>
    <Select aria-label="Language" items={languageItems} value="en">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {#each languageItems as { label, value } (value)}
          <SelectItem {value}>{label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
  </Field>

  <FieldGridRow>
    <Fieldset class="flex w-full flex-col gap-2">
      <FieldsetLegend
        class="inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4"
      >
        Timezone
      </FieldsetLegend>
      <FieldGrid class="gap-4">
        <Field class="contents">
          <Combobox autoHighlight defaultValue={defaultTimezone} items={timezoneItems}>
            <ComboboxTrigger class={cn(selectTriggerVariants(), 'min-w-0')}>
              <span class="flex-1 truncate in-data-placeholder:text-muted-foreground/72">
                <ComboboxValue />
              </span>
              <ChevronsUpDownIcon class="-me-1 size-4.5 opacity-80 sm:size-4" />
            </ComboboxTrigger>
            <ComboboxPopup aria-label="Select timezone">
              <div class="border-b p-2">
                <ComboboxInput
                  class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
                  placeholder="e.g. Europe/Rome"
                  showTrigger={false}
                >
                  {#snippet startAddon()}
                    <SearchIcon />
                  {/snippet}
                </ComboboxInput>
              </div>
              <ComboboxEmpty>No timezones found.</ComboboxEmpty>
              <ComboboxList>
                <ComboboxCollection>
                  {#snippet children(item: { label: string; value: string })}
                    <ComboboxItem label={item.label} value={item.value}>{item.label}</ComboboxItem>
                  {/snippet}
                </ComboboxCollection>
              </ComboboxList>
            </ComboboxPopup>
          </Combobox>
        </Field>
        <Button variant="outline">
          <CalendarIcon />
          <span>Schedule timezone change</span>
        </Button>
      </FieldGrid>
    </Fieldset>
  </FieldGridRow>

  <Field>
    <FieldLabel>Time format</FieldLabel>
    <Select aria-label="Time format" items={timeFormatItems} value="12">
      <SelectTrigger class="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {#each timeFormatItems as { label, value } (value)}
          <SelectItem {value}>{label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
    <FieldDescription>
      This is an internal setting and will not affect how times are displayed on public booking
      pages for you or anyone booking you.
    </FieldDescription>
  </Field>

  <Field>
    <FieldLabel>Start of week</FieldLabel>
    <Select aria-label="Start of week" items={startOfWeekItems} value="sunday">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {#each startOfWeekItems as { label, value } (value)}
          <SelectItem {value}>{label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
  </Field>
</FieldGrid>
