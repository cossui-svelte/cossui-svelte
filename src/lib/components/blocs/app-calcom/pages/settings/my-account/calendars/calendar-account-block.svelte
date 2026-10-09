<script lang="ts" module>
  export interface CalendarAccount {
    calendars: { label: string; value: string }[];
    email: string;
    showMenu: boolean;
  }
</script>

<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import Trash2Icon from '@lucide/svelte/icons/trash-2';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import {
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemDescription,
    ListItemHeader,
    ListItemTitle
  } from '../../../../components/list-item/index.js';

  const GOOGLE_CALENDAR_ICON = 'https://app.cal.com/app-store/googlecalendar/icon.svg';

  const CONFLICT_INSTRUCTION =
    'Toggle the calendars you want to check for conflicts to prevent double bookings.';

  let {
    account,
    onRemoveClick
  }: { account: CalendarAccount; onRemoveClick: (account: CalendarAccount) => void } = $props();
</script>

<ListItem>
  <ListItemContent>
    <ListItemHeader>
      <div class="flex items-start gap-4">
        <img
          alt="Google Calendar"
          class="size-10 shrink-0"
          height="40"
          src={GOOGLE_CALENDAR_ICON}
          width="40"
        />
        <div>
          <ListItemTitle>Google Calendar</ListItemTitle>
          <ListItemDescription>{account.email}</ListItemDescription>
        </div>
      </div>
    </ListItemHeader>
    <p class="text-muted-foreground text-sm">{CONFLICT_INSTRUCTION}</p>
    <div class="flex flex-col gap-3">
      {#each account.calendars as calendar (calendar.value)}
        <Field>
          <FieldLabel>
            <Switch />
            {calendar.label}
          </FieldLabel>
        </Field>
      {/each}
    </div>
  </ListItemContent>
  {#if account.showMenu}
    <ListItemActions>
      <Menu>
        <MenuTrigger
          aria-label="Calendar options"
          class={buttonVariants({ size: 'icon', variant: 'outline' })}
        >
          <EllipsisIcon />
        </MenuTrigger>
        <MenuPopup align="end">
          <MenuItem onclick={() => onRemoveClick(account)} variant="destructive">
            <Trash2Icon />
            Remove app
          </MenuItem>
        </MenuPopup>
      </Menu>
    </ListItemActions>
  {/if}
</ListItem>
