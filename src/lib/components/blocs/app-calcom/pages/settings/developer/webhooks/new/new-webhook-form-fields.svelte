<script lang="ts">
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
  import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup
  } from '#lib/components/ui/combobox/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Group, GroupSeparator } from '#lib/components/ui/group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import {
    NumberField,
    NumberFieldGroup,
    NumberFieldInput
  } from '#lib/components/ui/number-field/index.js';
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue
  } from '#lib/components/ui/select/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { Textarea } from '#lib/components/ui/textarea/index.js';

  const eventTriggerItems = [
    { label: 'Booking canceled', value: 'booking-canceled' },
    { label: 'Booking created', value: 'booking-created' },
    { label: 'Booking rejected', value: 'booking-rejected' },
    { label: 'Booking requested', value: 'booking-requested' },
    { label: 'Booking payment initiated', value: 'booking-payment-initiated' },
    { label: 'Booking rescheduled', value: 'booking-rescheduled' },
    { label: 'Booking paid', value: 'booking-paid' },
    { label: 'Meeting ended', value: 'meeting-ended' },
    { label: 'Meeting started', value: 'meeting-started' }
  ];

  const timeUnitItems = [
    { label: 'mins', value: 'mins' },
    { label: 'hours', value: 'hours' },
    { label: 'days', value: 'days' }
  ];

  const webhookVersionItems = [{ label: '2021-10-20', value: '2021-10-20' }];

  const payloadVariables = [
    {
      description: 'The name of the trigger event (e.g., BOOKING_CREATED, BOOKING_CANCELLED)',
      name: 'triggerEvent'
    },
    { description: 'The time of the webhook', name: 'createdAt' },
    { description: 'The event type slug', name: 'type' },
    { description: 'The event type name', name: 'title' },
    { description: 'The start time of the booking', name: 'startTime' },
    { description: 'The end time of the booking', name: 'endTime' },
    { description: 'List of attendee emails', name: 'attendees' }
  ];

  let customPayloadOpen = $state(false);
  let eventTriggers = $state<string[]>(['booking-canceled', 'booking-created']);
</script>

<div class="flex flex-col gap-6">
  <Field>
    <FieldLabel>Subscriber URL</FieldLabel>
    <Input placeholder="https://example.com/webhook" type="url" />
  </Field>

  <Field>
    <FieldLabel>
      <Switch checked />
      Enable webhook
    </FieldLabel>
  </Field>

  <Field>
    <FieldLabel>Event triggers</FieldLabel>
    <Combobox bind:value={eventTriggers} items={eventTriggerItems} multiple>
      <ComboboxChips>
        {#each eventTriggers as v (v)}
          {@const label = eventTriggerItems.find((i) => i.value === v)?.label ?? v}
          <ComboboxChip aria-label={label}>{label}</ComboboxChip>
        {/each}
        <ComboboxChipsInput
          aria-label="Select event triggers"
          placeholder={eventTriggers.length > 0 ? undefined : 'Select event triggers…'}
        />
      </ComboboxChips>
      <ComboboxPopup>
        <ComboboxEmpty>No event triggers found.</ComboboxEmpty>
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

  <Field>
    <FieldLabel>How long after the users don't show up on cal video meeting?</FieldLabel>
    <Group aria-label="How long after the users don't show up on cal video meeting?" class="w-full">
      <NumberField aria-label="Duration" class="gap-0" min={0} value={5}>
        <NumberFieldGroup>
          <NumberFieldInput class="text-left" />
        </NumberFieldGroup>
      </NumberField>
      <GroupSeparator />
      <Select items={timeUnitItems} value="mins">
        <SelectTrigger class="w-fit min-w-none">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {#each timeUnitItems as { label, value } (value)}
            <SelectItem {value}>{label}</SelectItem>
          {/each}
        </SelectPopup>
      </Select>
    </Group>
  </Field>

  <Field>
    <FieldLabel>Secret</FieldLabel>
    <Input type="text" />
  </Field>

  <Field>
    <FieldLabel>Webhook version</FieldLabel>
    <div class="flex items-center gap-2">
      <Select aria-label="Webhook version" items={webhookVersionItems} value="2021-10-20">
        <SelectTrigger class="w-fit min-w-none">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {#each webhookVersionItems as { label, value } (value)}
            <SelectItem {value}>{label}</SelectItem>
          {/each}
        </SelectPopup>
      </Select>
    </div>
    <FieldDescription class="flex items-center gap-1">
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#" onclick={(e) => e.preventDefault()}>View payload docs for this version</a>
      <ExternalLinkIcon aria-hidden="true" class="size-3" />
    </FieldDescription>
  </Field>

  <Collapsible bind:open={customPayloadOpen}>
    <Field>
      <FieldLabel>
        <Switch bind:checked={customPayloadOpen} />
        Custom Payload Template
      </FieldLabel>
    </Field>
    <CollapsiblePanel>
      <div class="mt-4 flex flex-col items-start gap-2">
        <Textarea placeholder={'{\n  \n}'} rows={4} />
        <Collapsible class="w-full">
          <CollapsibleTrigger class={buttonVariants({ size: 'sm', variant: 'outline' })}>
            Show available variables
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <ScrollArea
              class="mt-4 h-64 rounded-lg border border-input"
              overscrollContain
              scrollbarGutter
              scrollFade
            >
              <div class="p-2">
                <p class="my-1 px-[calc(--spacing(2)+1px)] font-medium text-sm">
                  Event and booking
                </p>
                <ul>
                  {#each payloadVariables as variable (variable.name)}
                    <li>
                      <Button
                        class="h-auto! w-full flex-col items-start gap-0.5 px-2 py-1.5 text-left"
                        variant="ghost"
                      >
                        <span class="font-mono text-xs">{`{{${variable.name}}}`}</span>
                        <span class="font-normal text-muted-foreground text-xs">
                          {variable.description}
                        </span>
                      </Button>
                    </li>
                  {/each}
                </ul>
              </div>
            </ScrollArea>
          </CollapsiblePanel>
        </Collapsible>
      </div>
    </CollapsiblePanel>
  </Collapsible>
</div>
