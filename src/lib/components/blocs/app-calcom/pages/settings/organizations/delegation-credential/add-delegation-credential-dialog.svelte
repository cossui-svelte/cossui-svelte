<script lang="ts">
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Dialog,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle
  } from '#lib/components/ui/dialog/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Textarea } from '#lib/components/ui/textarea/index.js';
  import { findWorkspacePlatformItem } from './delegation-credential-workspace-platforms.js';
  import WorkspacePlatformField from './workspace-platform-field.svelte';

  let {
    open = $bindable(false),
    onCreate
  }: {
    open?: boolean;
    onCreate?: (data: {
      domain: string;
      platformLabel: string;
      platformValue: string;
      serviceAccountKeyJson: string;
    }) => void;
  } = $props();

  let platform = $state<string | undefined>(undefined);
  let domain = $state('');
  let serviceAccountKeyJson = $state('');

  $effect(() => {
    if (open) {
      platform = undefined;
    }
  });

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const item = platform ? findWorkspacePlatformItem(platform) : null;
    onCreate?.({
      domain: domain.trim() || 'Untitled domain',
      platformLabel: item?.label ?? '—',
      platformValue: item?.value ?? '',
      serviceAccountKeyJson
    });
    open = false;
    domain = '';
    serviceAccountKeyJson = '';
  }
</script>

<Dialog bind:open>
  <DialogPopup class="max-w-xl" showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Add delegation credential</DialogTitle>
    </DialogHeader>
    <Form class="contents" onsubmit={handleSubmit}>
      <DialogPanel class="grid gap-4">
        <Field>
          <FieldLabel>Domain</FieldLabel>
          <Input bind:value={domain} name="domain" type="text" />
        </Field>
        <WorkspacePlatformField bind:value={platform} />
        <Field>
          <FieldLabel>Service account key JSON</FieldLabel>
          <Textarea
            bind:value={serviceAccountKeyJson}
            class="*:field-sizing-fixed font-mono text-sm *:min-h-0"
            name="serviceAccountKeyJson"
            placeholder={'{...}'}
            rows={8}
          />
        </Field>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: 'ghost' })} type="button">Cancel</DialogClose>
        <Button type="submit">Create</Button>
      </DialogFooter>
    </Form>
  </DialogPopup>
</Dialog>
