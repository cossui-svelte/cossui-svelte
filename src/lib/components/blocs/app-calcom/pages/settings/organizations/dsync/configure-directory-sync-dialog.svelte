<script lang="ts">
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Combobox,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxGroupLabel,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxTrigger,
    ComboboxValue
  } from '#lib/components/ui/combobox/index.js';
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle
  } from '#lib/components/ui/dialog/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { selectTriggerVariants } from '#lib/components/ui/select/index.js';

  interface DirectoryProviderItem {
    label: string;
    value: string;
  }

  const DIRECTORY_PROVIDER_ITEMS: DirectoryProviderItem[] = [
    { label: 'Azure SCIM v2.0', value: 'azure-scim-v2' },
    { label: 'Okta SCIM v2.0', value: 'okta-scim-v2' },
    { label: 'JumpCloud v2.0', value: 'jumpcloud-v2' },
    { label: 'OneLogin SCIM v2.0', value: 'onelogin-scim-v2' },
    { label: 'SCIM Generic v2.0', value: 'scim-generic-v2' }
  ];

  const initialDirectoryProvider = DIRECTORY_PROVIDER_ITEMS[0].value;

  let { open = $bindable(false), onConfigured }: { open?: boolean; onConfigured?: () => void } =
    $props();

  let directoryName = $state('');
  let provider = $state(initialDirectoryProvider);

  $effect(() => {
    if (!open) {
      return;
    }
    directoryName = '';
    provider = initialDirectoryProvider;
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onConfigured?.();
    open = false;
  }
</script>

<Dialog bind:open>
  <DialogPopup class="max-w-xl" showCloseButton={false}>
    <form class="contents" onsubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Configure directory sync</DialogTitle>
        <DialogDescription>
          Choose an identity provider to configure directory for your team.
        </DialogDescription>
      </DialogHeader>
      <DialogPanel>
        <div class="flex flex-col gap-4">
          <Field>
            <FieldLabel>Directory name</FieldLabel>
            <Input bind:value={directoryName} name="directoryName" required type="text" />
          </Field>
          <Field>
            <FieldLabel>Directory provider</FieldLabel>
            <Combobox
              items={DIRECTORY_PROVIDER_ITEMS}
              value={provider}
              onValueChange={(item: string | null) => {
                if (item) {
                  provider = item;
                }
              }}
            >
              <ComboboxTrigger class={selectTriggerVariants({ class: 'w-full' })}>
                <ComboboxValue />
              </ComboboxTrigger>
              <ComboboxPopup aria-label="Directory providers">
                <ComboboxEmpty>No providers found.</ComboboxEmpty>
                <ComboboxList>
                  <ComboboxGroup items={DIRECTORY_PROVIDER_ITEMS}>
                    <ComboboxGroupLabel class="sr-only">
                      Directory provider options
                    </ComboboxGroupLabel>
                    <ComboboxCollection>
                      {#snippet children(item: DirectoryProviderItem)}
                        <ComboboxItem value={item.value} label={item.label}>
                          {item.label}
                        </ComboboxItem>
                      {/snippet}
                    </ComboboxCollection>
                  </ComboboxGroup>
                </ComboboxList>
              </ComboboxPopup>
            </Combobox>
          </Field>
        </div>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: 'ghost' })} type="button">Cancel</DialogClose>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  </DialogPopup>
</Dialog>
