<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
  import SearchIcon from '@lucide/svelte/icons/search';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import {
    AppHeader,
    AppHeaderActions,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../components/app-header/index.js';
  import AddEventTypeDialog from './add-event-type-dialog.svelte';
  import EventTypesList from './event-types-list.svelte';

  let { params: _params }: { params: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Event Types">
    <AppHeaderDescription>
      Create events to share for people to book on your calendar.
    </AppHeaderDescription>
  </AppHeaderContent>
  <AppHeaderActions class="max-md:hidden">
    <InputGroup>
      <InputGroupInput aria-label="Search" placeholder="Search…" type="search" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
    <AddEventTypeDialog>
      <PlusIcon class="-ms-1" />
      New
    </AddEventTypeDialog>
  </AppHeaderActions>
</AppHeader>

<EventTypesList />
