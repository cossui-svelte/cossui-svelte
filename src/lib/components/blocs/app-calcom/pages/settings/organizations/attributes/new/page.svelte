<script lang="ts">
  import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardFrame, CardFrameFooter, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../../components/app-header/index.js';
  import { href } from '../../../../../lib/router.svelte.js';
  import NewAttributeFormFields from './new-attribute-form-fields.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <div class="flex min-w-0 items-start gap-3">
    <Button
      aria-label="Go back"
      href={href('/settings/organizations/attributes')}
      size="icon-sm"
      variant="ghost"
    >
      <ArrowLeftIcon aria-hidden="true" />
    </Button>
    <AppHeaderContent title="New attribute">
      <AppHeaderDescription>Create a custom attribute for your team members.</AppHeaderDescription>
    </AppHeaderContent>
  </div>
</AppHeader>
<CardFrame>
  <Card>
    <CardPanel>
      <NewAttributeFormFields />
    </CardPanel>
  </Card>
  <CardFrameFooter class="flex justify-end">
    <Button type="button">Save</Button>
  </CardFrameFooter>
</CardFrame>
