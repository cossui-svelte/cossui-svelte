<script lang="ts">
  import InfoIcon from '@lucide/svelte/icons/info';
  import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
  import { Alert, AlertDescription, AlertTitle } from '#lib/components/ui/alert/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Collapsible, CollapsiblePanel } from '#lib/components/ui/collapsible/index.js';
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
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue
  } from '#lib/components/ui/select/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import CopyableField from '../../../../components/copyable-field.svelte';

  type Step = 'form' | 'submitted';

  const expirationItems = [
    { label: '7 days', value: '7d' },
    { label: '30 days', value: '30d' },
    { label: '3 months', value: '3m' },
    { label: '1 year', value: '1y' }
  ];

  let { open = $bindable(false) }: { open?: boolean } = $props();

  let step = $state<Step>('form');
  let neverExpires = $state(false);
  let generatedKey = $state('');

  $effect(() => {
    if (open) {
      step = 'form';
      neverExpires = false;
      generatedKey = '';
    }
  });

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    generatedKey = 'cal_live_mock_api_key';
    step = 'submitted';
    (e.currentTarget as HTMLFormElement).reset();
  }
</script>

<Dialog bind:open>
  <DialogPopup class="max-w-xl" showCloseButton={false}>
    {#if step === 'form'}
      <DialogHeader>
        <DialogTitle>Create an API key</DialogTitle>
        <DialogDescription>
          API keys allow you to make API calls for your own account.
        </DialogDescription>
      </DialogHeader>
      <Form class="contents" onsubmit={handleSubmit}>
        <DialogPanel class="grid gap-6">
          <Alert variant="info">
            <InfoIcon />
            <AlertDescription>
              Here we can say something about OAuth with a link to the docs.
            </AlertDescription>
          </Alert>
          <Field>
            <FieldLabel>Name this key</FieldLabel>
            <Input name="note" placeholder="E.g. Development" type="text" />
          </Field>

          <Collapsible open={!neverExpires}>
            <Field>
              <FieldLabel>
                <Switch bind:checked={neverExpires} />
                Never expires
              </FieldLabel>
            </Field>
            <CollapsiblePanel>
              <Field class="mt-4">
                <FieldLabel>Expiration</FieldLabel>
                <Select
                  aria-label="Expiration"
                  items={expirationItems}
                  name="expiresAt"
                  value="30d"
                >
                  <SelectTrigger class="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    {#each expirationItems as { label, value } (value)}
                      <SelectItem {value}>{label}</SelectItem>
                    {/each}
                  </SelectPopup>
                </Select>
                <FieldDescription>The API key will expire on 21-03-2026</FieldDescription>
              </Field>
            </CollapsiblePanel>
          </Collapsible>
        </DialogPanel>
        <DialogFooter>
          <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </Form>
    {:else}
      <DialogHeader>
        <DialogTitle>API key created successfully</DialogTitle>
        <DialogDescription>
          Your new API key has been created. Copy it now — you won't be able to see it again.
        </DialogDescription>
      </DialogHeader>
      <DialogPanel class="flex flex-col gap-6">
        <Alert variant="warning">
          <TriangleAlertIcon />
          <AlertTitle>Save this API key somewhere safe</AlertTitle>
          <AlertDescription>
            You will not be able to view it again once you close this modal.
          </AlertDescription>
        </Alert>
        <CopyableField
          aria-label="API key"
          description="Expires 2/19/2027"
          label="API Key"
          monospace
          value={generatedKey}
        />
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants()}>Done</DialogClose>
      </DialogFooter>
    {/if}
  </DialogPopup>
</Dialog>
