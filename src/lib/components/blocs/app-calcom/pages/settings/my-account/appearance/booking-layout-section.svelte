<script lang="ts">
  import { Fieldset } from '#lib/components/ui/fieldset/index.js';
  import {
    ToggleGroup,
    ToggleGroupItem,
    ToggleGroupSeparator
  } from '#lib/components/ui/toggle-group/index.js';
  import { ImageCheckboxOption } from '../../../../components/particles/index.js';

  const layoutItems = [
    {
      imageSrc: 'https://app.cal.com/theme-light.svg',
      label: 'Month',
      value: 'month'
    },
    {
      imageSrc: 'https://app.cal.com/theme-light.svg',
      label: 'Weekly',
      value: 'weekly'
    },
    {
      imageSrc: 'https://app.cal.com/theme-light.svg',
      label: 'Column',
      value: 'column'
    }
  ];

  let enabledLayouts = $state(['month', 'weekly', 'column']);
  let defaultView = $state('month');

  function handleValueChange(newValue: string[]) {
    enabledLayouts = newValue;
    if (newValue.length === 0) return;
    if (newValue.includes(defaultView)) return;
    const first = newValue[0];
    if (first !== undefined) defaultView = first;
  }
</script>

<div class="flex flex-col gap-6">
  <Fieldset>
    <ImageCheckboxOption
      defaultItem={defaultView}
      items={layoutItems}
      onValueChange={handleValueChange}
      value={enabledLayouts}
    />
  </Fieldset>

  <div class="flex flex-col gap-2">
    <span class="font-medium text-sm">Default view</span>
    <ToggleGroup
      onValueChange={(values: string[]) => {
        if (values[0]) defaultView = values[0];
      }}
      value={[defaultView]}
      variant="outline"
    >
      <ToggleGroupItem
        aria-label="Month"
        disabled={!enabledLayouts.includes('month')}
        value="month"
      >
        Month
      </ToggleGroupItem>
      <ToggleGroupSeparator />
      <ToggleGroupItem
        aria-label="Weekly"
        disabled={!enabledLayouts.includes('weekly')}
        value="weekly"
      >
        Weekly
      </ToggleGroupItem>
      <ToggleGroupSeparator />
      <ToggleGroupItem
        aria-label="Column"
        disabled={!enabledLayouts.includes('column')}
        value="column"
      >
        Column
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</div>
