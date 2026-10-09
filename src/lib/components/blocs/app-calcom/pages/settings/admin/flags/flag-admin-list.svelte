<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import {
    Sheet,
    SheetClose,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetPanel,
    SheetPopup,
    SheetTitle
  } from '#lib/components/ui/sheet/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';
  import FlagGroup from './flag-group.svelte';
  import { FEATURE_FLAGS, type FeatureFlag, USERS } from './flags-data.js';

  function groupFlagsByType(flags: FeatureFlag[]) {
    const grouped: Record<string, FeatureFlag[]> = {};

    for (const flag of flags) {
      const type = flag.type;
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(flag);
    }

    return grouped;
  }

  let flags = $state(FEATURE_FLAGS);
  let activeFlagSlug = $state<string | null>(null);
  let selectedUserIds = $state<string[]>([]);
  let isAssignSheetOpen = $state(false);
  let userQuery = $state('');
  let visibleCount = $state(5);

  const filteredUsers = $derived.by(() => {
    const normalizedQuery = userQuery.trim().toLowerCase();

    if (!normalizedQuery) return USERS;

    return USERS.filter((user) =>
      [user.name, user.email].some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  });

  const visibleUsers = $derived(filteredUsers.slice(0, visibleCount));
  const hasMore = $derived(visibleCount < filteredUsers.length);

  const groupedFlags = $derived(groupFlagsByType(flags));
  const sortedTypes = $derived(Object.keys(groupedFlags).sort());

  function handleToggle(slug: string, checked: boolean) {
    flags = flags.map((flag) => (flag.slug === slug ? { ...flag, enabled: checked } : flag));
    toastManager.add({ title: 'Flags successfully updated', type: 'success' });
  }

  function handleAssignUsersClick(slug: string) {
    activeFlagSlug = slug;
    visibleCount = 5;
    isAssignSheetOpen = true;
  }

  function handleUserAssignedChange(userId: string, checked: boolean) {
    if (checked && !selectedUserIds.includes(userId)) {
      selectedUserIds = [...selectedUserIds, userId];
    } else if (!checked) {
      selectedUserIds = selectedUserIds.filter((id) => id !== userId);
    }
  }

  function handleSaveAssignments() {
    toastManager.add({ title: 'Users successfully assigned', type: 'success' });
  }
</script>

<Sheet bind:open={isAssignSheetOpen}>
  <div class="flex flex-col gap-4">
    {#each sortedTypes as type (type)}
      <FlagGroup
        flags={groupedFlags[type] ?? []}
        onAssignUsers={handleAssignUsersClick}
        onToggle={handleToggle}
        {type}
      />
    {/each}
  </div>

  <SheetPopup variant="inset">
    <SheetHeader>
      <SheetTitle>Assign to users</SheetTitle>
      <SheetDescription>
        {activeFlagSlug
          ? `Assign ${activeFlagSlug} to one or more users.`
          : 'Assign this flag to one or more users.'}
      </SheetDescription>
    </SheetHeader>

    <SheetPanel class="flex flex-col gap-3">
      <Input
        oninput={(e: Event & { currentTarget: HTMLInputElement }) => {
          userQuery = e.currentTarget.value;
          visibleCount = 5;
        }}
        placeholder="Search users…"
        value={userQuery}
      />
      <div class="flex flex-col gap-2">
        {#each visibleUsers as user (user.id)}
          {@const switchId = `assign-flag-user-${user.id}`}
          <Label
            class="flex items-center justify-between gap-6 rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
            for={switchId}
          >
            <div class="flex min-w-0 items-center gap-3">
              <Avatar class="size-8">
                {#if user.avatarUrl}
                  <AvatarImage alt={user.name} src={user.avatarUrl} />
                {/if}
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div class="flex min-w-0 flex-col gap-0.5">
                <p class="truncate font-medium text-sm">{user.name}</p>
                <p class="truncate text-muted-foreground text-xs">{user.email}</p>
              </div>
            </div>

            <Switch
              checked={selectedUserIds.includes(user.id)}
              class="[--thumb-size:--spacing(4)] sm:[--thumb-size:--spacing(3)]"
              id={switchId}
              onCheckedChange={(checked: boolean) => handleUserAssignedChange(user.id, checked)}
            />
          </Label>
        {/each}
      </div>
      {#if hasMore}
        <Button class="w-full" onclick={() => (visibleCount += 5)} variant="outline">
          Load more
        </Button>
      {/if}
    </SheetPanel>

    <SheetFooter>
      <SheetClose class={buttonVariants({ variant: 'ghost' })}>Cancel</SheetClose>
      <SheetClose class={buttonVariants()} onclick={handleSaveAssignments}>Save</SheetClose>
    </SheetFooter>
  </SheetPopup>
</Sheet>
