<script lang="ts">
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import {
    Select,
    SelectGroup,
    SelectGroupLabel,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue
  } from '#lib/components/ui/select/index.js';
  import { FieldGrid } from '../../../../components/particles/index.js';

  const addEventsToGroups = [
    {
      items: [
        {
          label: 'example@cal.com',
          triggerLabel: 'example@cal.com (Google - example@cal.com)',
          value: 'google-example'
        },
        {
          label: 'Team',
          triggerLabel: 'Team (Google - example@cal.com)',
          value: 'google-team'
        }
      ],
      label: 'Google (example@cal.com)'
    }
  ];

  const defaultReminderItems = [
    { label: 'Use default reminders', value: 'default' },
    { label: 'Just in time', value: '0' },
    { label: '10 minutes before', value: '10' },
    { label: '30 minutes before', value: '30' },
    { label: '60 minutes before', value: '60' }
  ];

  const allAddEventsToItems = addEventsToGroups.flatMap((g) => g.items);
  // The trigger shows the longer label; the popup items show the short one.
  const addEventsToTriggerItems = allAddEventsToItems.map((item) => ({
    label: item.triggerLabel,
    value: item.value
  }));
</script>

<FieldGrid>
  <Field>
    <FieldLabel>Add events to</FieldLabel>
    <Select aria-label="Add events to" items={addEventsToTriggerItems} value="google-example">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {#each addEventsToGroups as group (group.label)}
          <SelectGroup>
            <SelectGroupLabel>{group.label}</SelectGroupLabel>
            {#each group.items as item (item.value)}
              <SelectItem value={item.value}>{item.label}</SelectItem>
            {/each}
          </SelectGroup>
        {/each}
      </SelectPopup>
    </Select>
    <FieldDescription>
      You can override this on a per-event basis in the advanced settings in each event type.
    </FieldDescription>
  </Field>

  <Field>
    <FieldLabel>Default reminder</FieldLabel>
    <Select aria-label="Default reminder" items={defaultReminderItems} value="default">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {#each defaultReminderItems as { label, value } (value)}
          <SelectItem {value}>{label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
    <FieldDescription>
      Set the default reminder time for events added to your Google Calendar.
    </FieldDescription>
  </Field>
</FieldGrid>
