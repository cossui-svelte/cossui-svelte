<script lang="ts">
  import InfoIcon from '@lucide/svelte/icons/info';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import SearchIcon from '@lucide/svelte/icons/search';
  import XIcon from '@lucide/svelte/icons/x';
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
  import { Group } from '#lib/components/ui/group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
    selectTriggerVariants
  } from '#lib/components/ui/select/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';

  const attributeTypeItems = [
    { label: 'Text', value: 'text' },
    { label: 'Number', value: 'number' },
    { label: 'Single Select', value: 'single_select' },
    { label: 'Multi Select', value: 'multi_select' }
  ];

  const legendClass = 'inline-flex items-center gap-2 font-medium text-base/4.5 sm:text-sm/4';

  let attributeType = $state('text');

  let nextOptionId = 1;
  let options = $state([{ id: 0 }]);

  const showWeightsSwitch = $derived(
    attributeType === 'single_select' || attributeType === 'multi_select'
  );

  function addOption() {
    options = [...options, { id: nextOptionId++ }];
  }

  function removeOption(id: number) {
    options = options.filter((o) => o.id !== id);
  }

  let nextGroupOptionId = 1;
  let groupOptions = $state<{ id: number; selectedOptionId: number | null }[]>([
    { id: 0, selectedOptionId: null }
  ]);

  const optionPickItems = $derived(
    options.map((o, i) => ({ label: `Option ${i + 1}`, value: String(o.id) }))
  );

  function addGroupOption() {
    groupOptions = [...groupOptions, { id: nextGroupOptionId++, selectedOptionId: null }];
  }

  function removeGroupOption(id: number) {
    groupOptions = groupOptions.filter((r) => r.id !== id);
  }
</script>

<div class="flex flex-col gap-6">
  <Field>
    <div class="flex items-start gap-2">
      <Switch name="lockForAssignment" />
      <div class="flex flex-col gap-1">
        <FieldLabel>Lock for assignment</FieldLabel>
        <FieldDescription>Locking would only allow assignments from Directory Sync</FieldDescription
        >
      </div>
    </div>
  </Field>

  {#if showWeightsSwitch}
    <Field>
      <div class="flex items-start gap-2">
        <Switch name="weightsEnabled" />
        <div class="flex flex-col gap-1">
          <FieldLabel>Weights enabled</FieldLabel>
          <FieldDescription>
            By enabling weights, it would be possible to assign higher priority to certain
            attributes per user. The higher the weight, the higher the priority.
          </FieldDescription>
        </div>
      </div>
    </Field>
  {/if}

  <Field>
    <FieldLabel>Name</FieldLabel>
    <Input name="name" type="text" />
  </Field>

  <Field>
    <FieldLabel>Type</FieldLabel>
    <Select
      aria-label="Attribute type"
      items={attributeTypeItems}
      value={attributeType}
      onValueChange={(value: string) => value && (attributeType = value)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {#each attributeTypeItems as { label, value } (value)}
          <SelectItem {value}>{label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
  </Field>

  {#if showWeightsSwitch}
    <div class="rounded-xl bg-muted p-4">
      <div class="flex flex-col gap-4">
        <Fieldset class="flex w-full flex-col gap-2">
          <FieldsetLegend class={legendClass}>Options</FieldsetLegend>
          {#if options.length > 0}
            <div class="flex flex-col gap-2">
              {#each options as option, index (option.id)}
                <Group aria-label={`Option ${index + 1}`} class="w-full gap-2">
                  <Input
                    class="min-w-0 flex-1"
                    name={`options[${index}]`}
                    placeholder="Enter option value"
                    type="text"
                  />
                  <div>
                    <Button
                      aria-label="Remove option"
                      onclick={() => removeOption(option.id)}
                      size="icon"
                      type="button"
                      variant="outline"
                    >
                      <XIcon aria-hidden="true" />
                    </Button>
                  </div>
                </Group>
              {/each}
            </div>
          {/if}
          <div>
            <Button onclick={addOption} type="button" variant="outline">
              <PlusIcon aria-hidden="true" />
              New option
            </Button>
          </div>
        </Fieldset>

        <Fieldset class="flex w-full flex-col gap-2">
          <div class="flex items-center gap-1.5">
            <FieldsetLegend class={legendClass}>Group options</FieldsetLegend>
            <Popover>
              <PopoverTrigger
                aria-label="About group options"
                closeDelay={100}
                delay={0}
                openOnHover
              >
                <InfoIcon class="size-3.5 text-muted-foreground" />
              </PopoverTrigger>
              <PopoverPopup class="max-w-64 text-center" side="top" tooltipStyle>
                <p>
                  When a group option is assigned to a user, they behave as if all options within
                  that group are assigned to them.
                </p>
              </PopoverPopup>
            </Popover>
          </div>
          {#if groupOptions.length > 0}
            <div class="flex flex-col gap-2">
              {#each groupOptions as row, index (row.id)}
                <Group aria-label={`Group option ${index + 1}`} class="w-full gap-2">
                  <Input class="flex-1" name={`groupOptions[${index}].name`} type="text" />
                  <div class="flex-1">
                    <Combobox
                      disabled={optionPickItems.length === 0}
                      items={optionPickItems}
                      value={row.selectedOptionId === null
                        ? undefined
                        : String(row.selectedOptionId)}
                      onValueChange={(item: string | null) => {
                        groupOptions = groupOptions.map((r) =>
                          r.id === row.id
                            ? { ...r, selectedOptionId: item == null ? null : Number(item) }
                            : r
                        );
                      }}
                    >
                      <ComboboxTrigger class={selectTriggerVariants({ class: 'w-full min-w-0' })}>
                        <ComboboxValue placeholder="Choose an option" />
                      </ComboboxTrigger>
                      <ComboboxPopup aria-label="Choose an option">
                        <div class="border-b p-2">
                          <ComboboxInput
                            class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
                            placeholder="Search options…"
                            showTrigger={false}
                          >
                            {#snippet startAddon()}
                              <SearchIcon />
                            {/snippet}
                          </ComboboxInput>
                        </div>
                        <ComboboxEmpty>No options available.</ComboboxEmpty>
                        <ComboboxList>
                          <ComboboxCollection>
                            {#snippet children(item: { label: string; value: string })}
                              <ComboboxItem value={item.value} label={item.label}>
                                {item.label}
                              </ComboboxItem>
                            {/snippet}
                          </ComboboxCollection>
                        </ComboboxList>
                      </ComboboxPopup>
                    </Combobox>
                  </div>
                  <div>
                    <Button
                      aria-label="Remove group option"
                      onclick={() => removeGroupOption(row.id)}
                      size="icon"
                      type="button"
                      variant="outline"
                    >
                      <XIcon aria-hidden="true" />
                    </Button>
                  </div>
                </Group>
              {/each}
            </div>
          {/if}
          <div>
            <Button onclick={addGroupOption} type="button" variant="outline">
              <PlusIcon aria-hidden="true" />
              New group option
            </Button>
          </div>
        </Fieldset>
      </div>
    </div>
  {/if}
</div>
