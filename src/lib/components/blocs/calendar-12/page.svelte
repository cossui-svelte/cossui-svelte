<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { type DateRange } from '#lib/components/ui/calendar/index.js';
  import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardPanel,
    CardTitle
  } from '#lib/components/ui/card/index.js';
  import { RangeCalendar } from '#lib/components/ui/range-calendar/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger
  } from '#lib/components/ui/select/index.js';

  let value = $state<DateRange | undefined>({
    start: new CalendarDate(2025, 9, 9),
    end: new CalendarDate(2025, 9, 17)
  });

  const localizedStrings = {
    en: {
      title: 'Book an appointment',
      description: 'Select the dates for your appointment'
    },
    es: {
      title: 'Reserva una cita',
      description: 'Selecciona las fechas para tu cita'
    }
  } as const;

  let locale = $state<keyof typeof localizedStrings>('es');

  const languageOptions = [
    {
      label: 'English',
      value: 'en'
    },
    {
      label: 'Español',
      value: 'es'
    }
  ];

  const selectedLanguage = $derived(
    languageOptions.find((option) => option.value === locale)?.label ?? 'Language'
  );
</script>

<Card>
  <CardHeader>
    <CardTitle>{localizedStrings[locale].title}</CardTitle>
    <CardDescription>{localizedStrings[locale].description}</CardDescription>
    <CardAction>
      <Select bind:value={locale}>
        <SelectTrigger class="w-[100px]" aria-label="Select language">
          {selectedLanguage}
        </SelectTrigger>
        <SelectPopup align="end">
          {#each languageOptions as option (option.value)}
            <SelectItem value={option.value}>{option.label}</SelectItem>
          {/each}
        </SelectPopup>
      </Select>
    </CardAction>
  </CardHeader>
  <CardPanel>
    <RangeCalendar
      bind:value
      numberOfMonths={2}
      {locale}
      class="bg-transparent p-0"
      buttonVariant="outline"
    />
  </CardPanel>
</Card>
