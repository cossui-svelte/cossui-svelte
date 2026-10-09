<script lang="ts">
  import { ListItem, ListItemContent } from '../../../../components/list-item/index.js';
  import type { TeamDirectoryRow } from './directory-sync-types.js';
  import TeamRowGroups from './team-row-groups.svelte';

  let { initialRows }: { initialRows: TeamDirectoryRow[] } = $props();

  // svelte-ignore state_referenced_locally
  let rows = $state<TeamDirectoryRow[]>(initialRows);

  function removeGroup(teamId: string, groupName: string) {
    rows = rows.map((row) =>
      row.id === teamId
        ? { ...row, groupNames: row.groupNames.filter((g) => g !== groupName) }
        : row
    );
  }

  function addGroup(teamId: string, name: string) {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }
    rows = rows.map((row) =>
      row.id === teamId && !row.groupNames.includes(trimmed)
        ? { ...row, groupNames: [...row.groupNames, trimmed] }
        : row
    );
  }
</script>

{#each rows as row (row.id)}
  <ListItem>
    <div class="flex min-w-0 flex-1 flex-col gap-2 md:flex-row">
      <div class="flex items-center md:min-h-7 md:w-36 md:shrink-0">
        <p class="font-medium text-foreground text-sm">{row.teamName}</p>
      </div>
      <ListItemContent>
        <TeamRowGroups
          groupNames={row.groupNames}
          onAddGroup={addGroup}
          onRemoveGroup={removeGroup}
          teamId={row.id}
        />
      </ListItemContent>
    </div>
  </ListItem>
{/each}
