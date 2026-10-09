<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Card, CardFrame, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderActions,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../../components/app-header/index.js';
  import CalendarsEmpty from '../calendars-empty.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Calendars">
    <AppHeaderDescription>
      Configure how your event types interact with your calendars
    </AppHeaderDescription>
  </AppHeaderContent>
  <AppHeaderActions>
    <Button variant="outline">
      <PlusIcon />
      Add calendar
    </Button>
  </AppHeaderActions>
</AppHeader>
<CardFrame>
  <Card>
    <CardPanel class="p-0">
      <CalendarsEmpty />
    </CardPanel>
  </Card>
</CardFrame>
