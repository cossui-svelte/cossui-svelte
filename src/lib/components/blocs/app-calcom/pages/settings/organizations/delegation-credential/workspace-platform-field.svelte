<script lang="ts">
  import SearchIcon from '@lucide/svelte/icons/search';
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
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { selectTriggerVariants } from '#lib/components/ui/select/index.js';
  import { WORKSPACE_PLATFORM_ITEMS } from './delegation-credential-workspace-platforms.js';

  let { value = $bindable() }: { value?: string } = $props();
</script>

<Field>
  <FieldLabel>Workspace platform</FieldLabel>
  <Combobox
    aria-label="Workspace platform"
    items={WORKSPACE_PLATFORM_ITEMS}
    {value}
    onValueChange={(item: string | null) => (value = item ?? undefined)}
  >
    <ComboboxTrigger class={selectTriggerVariants({ class: 'w-full min-w-0' })}>
      <ComboboxValue placeholder="Select..." />
    </ComboboxTrigger>
    <ComboboxPopup aria-label="Workspace platform">
      <div class="border-b p-2">
        <ComboboxInput
          class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
          placeholder="Search…"
          showTrigger={false}
        >
          {#snippet startAddon()}
            <SearchIcon />
          {/snippet}
        </ComboboxInput>
      </div>
      <ComboboxEmpty>No platforms found.</ComboboxEmpty>
      <ComboboxList>
        <ComboboxCollection>
          {#snippet children(item: { label: string; value: string })}
            <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
          {/snippet}
        </ComboboxCollection>
      </ComboboxList>
    </ComboboxPopup>
  </Combobox>
</Field>
