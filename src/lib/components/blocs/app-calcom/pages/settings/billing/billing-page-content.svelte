<script lang="ts">
  import {
    type DateValue,
    getLocalTimeZone,
    isSameDay,
    startOfMonth,
    startOfYear,
    today
  } from '@internationalized/date';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import FileTextIcon from '@lucide/svelte/icons/file-text';
  import SearchIcon from '@lucide/svelte/icons/search';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
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
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import { FieldsetLegend } from '#lib/components/ui/fieldset/index.js';
  import { Group } from '#lib/components/ui/group/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupText
  } from '#lib/components/ui/input-group/index.js';
  import { NumberField, NumberFieldInput } from '#lib/components/ui/number-field/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { RangeCalendar } from '#lib/components/ui/range-calendar/index.js';
  import { selectTriggerVariants } from '#lib/components/ui/select/index.js';
  import { cn } from '#lib/utils.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../components/app-header/index.js';
  import { FieldGrid } from '../../../components/particles/index.js';

  const monthOptions = [
    { label: 'January 2026', value: 'January 2026' },
    { label: 'February 2026', value: 'February 2026' },
    { label: 'March 2026', value: 'March 2026' },
    { label: 'April 2026', value: 'April 2026' },
    { label: 'May 2026', value: 'May 2026' },
    { label: 'June 2026', value: 'June 2026' }
  ];

  const tz = getLocalTimeZone();
  const todayValue = today(tz);
  const formatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const formatDate = (date: DateValue) => formatter.format(date.toDate(tz));

  let credits = $state<number | undefined>(50);
  let expenseLogMonth = $state<string | undefined>('February 2026');
  let invoiceRange = $state<{ start: DateValue | undefined; end: DateValue | undefined }>({
    end: todayValue,
    start: todayValue.subtract({ days: 6 })
  });
  let invoiceMonth = $state<DateValue>(todayValue);

  const invoicePresets = [
    { label: 'Today', range: () => ({ end: todayValue, start: todayValue }), value: 'today' },
    {
      label: 'Last 7 days',
      range: () => ({ end: todayValue, start: todayValue.subtract({ days: 6 }) }),
      value: 'last-7-days'
    },
    {
      label: 'Last 30 days',
      range: () => ({ end: todayValue, start: todayValue.subtract({ days: 29 }) }),
      value: 'last-30-days'
    },
    {
      label: 'Month to date',
      range: () => ({ end: todayValue, start: startOfMonth(todayValue) }),
      value: 'month-to-date'
    },
    {
      label: 'Year to date',
      range: () => ({ end: todayValue, start: startOfYear(todayValue) }),
      value: 'year-to-date'
    }
  ];

  function applyInvoicePreset(preset: (typeof invoicePresets)[number]) {
    const range = preset.range();
    invoiceRange = range;
    invoiceMonth = range.end;
  }

  // The active preset is the one whose range matches the current selection
  // (a manual selection that differs from every preset clears the highlight).
  const selectedInvoicePreset = $derived(
    invoicePresets.find((preset) => {
      const range = preset.range();
      return (
        invoiceRange.start &&
        invoiceRange.end &&
        isSameDay(invoiceRange.start, range.start) &&
        isSameDay(invoiceRange.end, range.end)
      );
    })?.value ?? null
  );

  const invoiceRangeLabel = $derived(
    invoiceRange.start && invoiceRange.end
      ? `${formatDate(invoiceRange.start)} - ${formatDate(invoiceRange.end)}`
      : 'Select date range'
  );
</script>

<AppHeader>
  <AppHeaderContent title="Billing">
    <AppHeaderDescription>Manage all things billing</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <Card class="rounded-b-none!">
      <CardPanel>
        <div class="flex items-center justify-between gap-4">
          <div>
            <CardFrameTitle>Manage billing</CardFrameTitle>
            <CardFrameDescription>View and manage your billing details</CardFrameDescription>
          </div>
          <Button>
            Billing portal
            <ExternalLinkIcon aria-hidden="true" />
          </Button>
        </div>
      </CardPanel>
    </Card>
  </CardFrame>

  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Credits</CardFrameTitle>
      <CardFrameDescription>View and manage credits for sending SMS messages</CardFrameDescription>
    </CardFrameHeader>
    <Card class="rounded-b-none!">
      <CardPanel>
        <FieldGrid>
          <div>
            <FieldsetLegend class="inline">
              Current balance: <span class="font-normal text-muted-foreground">0</span>
            </FieldsetLegend>
          </div>
          <Field class="md:col-start-1">
            <div class="flex items-center gap-2">
              <FieldLabel>Additional credits</FieldLabel>
            </div>
            <Group aria-label="Additional credits" class="w-full gap-2">
              <InputGroup>
                <NumberField
                  aria-label="Credits"
                  min={1}
                  bind:value={() => credits, (v) => (credits = v ?? 0)}
                >
                  <NumberFieldInput class="text-left" />
                </NumberField>
                <InputGroupAddon align="inline-end">
                  <InputGroupText>Credits</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <div>
                <Button variant="outline">Buy</Button>
              </div>
            </Group>
            <FieldDescription>One credit is worth 1¢ (USD).</FieldDescription>
          </Field>
          <Field class="md:col-start-1">
            <FieldLabel>Download Expense Log</FieldLabel>
            <Group aria-label="Download Expense Log" class="w-full gap-2">
              <Combobox autoHighlight bind:value={expenseLogMonth} items={monthOptions}>
                <ComboboxTrigger class={cn(selectTriggerVariants(), 'min-w-0')}>
                  <span class="flex-1 truncate in-data-placeholder:text-muted-foreground/72">
                    <ComboboxValue />
                  </span>
                  <ChevronsUpDownIcon class="-me-1 size-4.5 opacity-80 sm:size-4" />
                </ComboboxTrigger>
                <ComboboxPopup aria-label="Select month">
                  <div class="border-b p-2">
                    <ComboboxInput placeholder="e.g. February 2026" showTrigger={false}>
                      {#snippet startAddon()}
                        <SearchIcon />
                      {/snippet}
                    </ComboboxInput>
                  </div>
                  <ComboboxEmpty>No months found.</ComboboxEmpty>
                  <ComboboxList>
                    <ComboboxCollection>
                      {#snippet children(item: { label: string; value: string })}
                        <ComboboxItem label={item.label} value={item.value}>
                          {item.label}
                        </ComboboxItem>
                      {/snippet}
                    </ComboboxCollection>
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
              <div>
                <Button variant="outline">Download</Button>
              </div>
            </Group>
          </Field>
        </FieldGrid>
      </CardPanel>
    </Card>
  </CardFrame>

  <CardFrame>
    <CardFrameHeader>
      <div class="flex w-full items-center justify-between gap-4">
        <CardFrameTitle>Invoices</CardFrameTitle>
        <Popover>
          <PopoverTrigger class={cn(selectTriggerVariants(), 'w-fit min-w-0')}>
            <span class="flex-1 truncate in-data-placeholder:text-muted-foreground/72">
              {invoiceRangeLabel}
            </span>
            <ChevronsUpDownIcon class="-me-1 size-4.5 opacity-80 sm:size-4" />
          </PopoverTrigger>
          <PopoverPopup align="end" class="p-0">
            <div class="flex max-sm:flex-col">
              <div class="relative max-sm:order-1 max-sm:border-t max-sm:pt-2 sm:py-1">
                <div class="flex h-full flex-col gap-0.5 sm:min-w-36 sm:border-e sm:pe-2">
                  {#each invoicePresets as preset (preset.label)}
                    <Button
                      class="justify-start"
                      data-pressed={selectedInvoicePreset === preset.value ? '' : undefined}
                      onclick={() => applyInvoicePreset(preset)}
                      variant="ghost"
                    >
                      {preset.label}
                    </Button>
                  {/each}
                </div>
              </div>
              <RangeCalendar
                bind:placeholder={invoiceMonth}
                bind:value={invoiceRange}
                class="max-sm:pb-2 sm:ps-2"
                numberOfMonths={1}
              />
            </div>
          </PopoverPopup>
        </Popover>
      </div>
    </CardFrameHeader>
    <Card class="rounded-b-none!">
      <CardPanel class="p-0">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileTextIcon />
            </EmptyMedia>
            <EmptyTitle>No invoices found</EmptyTitle>
            <EmptyDescription>No invoices found in the selected date range.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardPanel>
    </Card>
  </CardFrame>

  <div class="mt-2 text-center text-muted-foreground/72 text-sm">
    Need help?
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
      class="text-muted-foreground underline hover:text-foreground"
      href="#"
      onclick={(e) => e.preventDefault()}
    >
      Contact support
    </a>
  </div>
</div>
