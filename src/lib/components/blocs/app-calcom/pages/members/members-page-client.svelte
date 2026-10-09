<script lang="ts">
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../components/app-header/index.js';
  import {
    type ColumnKey,
    DEFAULT_COLUMN_VISIBILITY,
    members,
    type RoleFilter
  } from './members-data.js';
  import MembersTable from './members-table.svelte';
  import MembersToolbar from './members-toolbar.svelte';

  let roleFilter = $state<RoleFilter>('all');
  let searchValue = $state('');
  let columnVisibility = $state<Record<ColumnKey, boolean>>({ ...DEFAULT_COLUMN_VISIBILITY });

  const filteredMembers = $derived.by(() => {
    const query = searchValue.trim().toLowerCase();

    return members.filter((member) => {
      const matchesRole = roleFilter === 'all' || member.role === roleFilter;
      const matchesQuery =
        query.length === 0 ||
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.teams.some((team) => team.toLowerCase().includes(query));

      return matchesRole && matchesQuery;
    });
  });
</script>

<AppHeader>
  <AppHeaderContent title="Members">
    <AppHeaderDescription>Manage organization members and their access.</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>

<div class="mt-6 flex flex-col gap-4">
  <MembersToolbar
    {columnVisibility}
    bind:roleFilter
    bind:searchValue
    onColumnVisibilityChange={(next) => (columnVisibility = next)}
  />
  <MembersTable {columnVisibility} data={filteredMembers} />
</div>
