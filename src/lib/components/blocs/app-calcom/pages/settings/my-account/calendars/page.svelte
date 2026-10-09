<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import {
    AppHeader,
    AppHeaderActions,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import CalendarsDemoForm from './calendars-demo-form.svelte';
  import CheckForConflictsCard from './check-for-conflicts-card.svelte';

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

<div class="flex flex-col gap-4">
  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Add to calendar</CardFrameTitle>
      <CardFrameDescription>Select where to add events when you're booked.</CardFrameDescription>
    </CardFrameHeader>

    <Card class="rounded-b-none!">
      <CardPanel>
        <CalendarsDemoForm />
      </CardPanel>
    </Card>
  </CardFrame>

  <CheckForConflictsCard />
</div>
