<script lang="ts">
  import { Dialog, DialogPopup } from '#lib/components/ui/dialog/index.js';
  import type {
    DelegationCredentialItem,
    EditDelegationCredentialSavePayload
  } from './delegation-credential-types.js';
  import EditDelegationCredentialForm from './edit-delegation-credential-form.svelte';

  let {
    credential,
    onOpenChange,
    onSave,
    open
  }: {
    credential: DelegationCredentialItem | null;
    onOpenChange: (open: boolean) => void;
    onSave: (id: string, data: EditDelegationCredentialSavePayload) => void;
    open: boolean;
  } = $props();
</script>

<Dialog open={open && !!credential} {onOpenChange}>
  <DialogPopup class="max-w-xl" showCloseButton={false}>
    {#if credential}
      {#key credential.id}
        <EditDelegationCredentialForm {credential} {onSave} onDone={() => onOpenChange(false)} />
      {/key}
    {/if}
  </DialogPopup>
</Dialog>
