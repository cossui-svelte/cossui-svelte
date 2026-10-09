<script lang="ts">
  import { FieldGrid, FieldGridRow } from '../../../../components/particles/index.js';
  import PasswordInput from './password-input.svelte';
</script>

<FieldGrid class="gap-x-6 gap-y-4">
  <PasswordInput label="Old password" placeholder="Enter your current password" />
  <PasswordInput label="New password" placeholder="Enter your new password" />

  <FieldGridRow class="text-muted-foreground text-xs">
    The password must be a minimum of 7 characters long containing at least one number and have a
    mixture of uppercase and lowercase letters.
  </FieldGridRow>
</FieldGrid>
