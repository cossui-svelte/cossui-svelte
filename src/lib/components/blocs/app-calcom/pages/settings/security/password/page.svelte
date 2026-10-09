<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardFrame, CardFrameFooter, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import { SettingsToggle } from '../../../../components/particles/index.js';
  import PasswordFormFields from './password-form.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Password">
    <AppHeaderDescription>Manage settings for your account passwords</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <Card class="rounded-b-none!">
      <CardPanel>
        <PasswordFormFields />
      </CardPanel>
    </Card>

    <CardFrameFooter class="flex justify-end">
      <Button disabled>Update</Button>
    </CardFrameFooter>
  </CardFrame>

  <SettingsToggle
    description="Invalidate your session after a certain amount of time."
    title="Session timeout"
  />
</div>
