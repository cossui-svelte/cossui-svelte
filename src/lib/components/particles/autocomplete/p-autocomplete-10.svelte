<script lang="ts">
  import {
    Autocomplete,
    AutocompleteCollection,
    AutocompleteEmpty,
    AutocompleteGroup,
    AutocompleteGroupLabel,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup,
    AutocompleteSeparator,
  } from '$lib/components/ui/autocomplete';

  type Tag = { id: string; label: string; group: 'Status' | 'Priority' | 'Team' };

  const tagsData: Tag[] = [
    { group: 'Status', id: 's-open', label: 'Open' },
    { group: 'Status', id: 's-in-progress', label: 'In progress' },
    { group: 'Status', id: 's-blocked', label: 'Blocked' },
    { group: 'Status', id: 's-resolved', label: 'Resolved' },
    { group: 'Status', id: 's-closed', label: 'Closed' },
    { group: 'Priority', id: 'p-low', label: 'Low' },
    { group: 'Priority', id: 'p-medium', label: 'Medium' },
    { group: 'Priority', id: 'p-high', label: 'High' },
    { group: 'Priority', id: 'p-urgent', label: 'Urgent' },
    { group: 'Team', id: 't-design', label: 'Design' },
    { group: 'Team', id: 't-frontend', label: 'Frontend' },
    { group: 'Team', id: 't-backend', label: 'Backend' },
    { group: 'Team', id: 't-devops', label: 'DevOps' },
    { group: 'Team', id: 't-qa', label: 'QA' },
    { group: 'Team', id: 't-mobile', label: 'Mobile' },
    { group: 'Team', id: 't-data', label: 'Data' },
    { group: 'Team', id: 't-security', label: 'Security' },
    { group: 'Team', id: 't-platform', label: 'Platform' },
    { group: 'Team', id: 't-infra', label: 'Infrastructure' },
    { group: 'Team', id: 't-product', label: 'Product' },
    { group: 'Team', id: 't-marketing', label: 'Marketing' },
    { group: 'Team', id: 't-sales', label: 'Sales' },
    { group: 'Team', id: 't-support', label: 'Support' },
    { group: 'Team', id: 't-research', label: 'Research' },
    { group: 'Team', id: 't-content', label: 'Content' },
    { group: 'Team', id: 't-analytics', label: 'Analytics' },
    { group: 'Team', id: 't-operations', label: 'Operations' },
    { group: 'Team', id: 't-finance', label: 'Finance' },
    { group: 'Team', id: 't-hr', label: 'HR' },
    { group: 'Team', id: 't-legal', label: 'Legal' },
    { group: 'Team', id: 't-growth', label: 'Growth' },
    { group: 'Team', id: 't-partner', label: 'Partner' },
    { group: 'Team', id: 't-community', label: 'Community' },
    { group: 'Team', id: 't-docs', label: 'Docs' },
    { group: 'Team', id: 't-l10n', label: 'Localization' },
    { group: 'Team', id: 't-a11y', label: 'Accessibility' },
    { group: 'Team', id: 't-sre', label: 'SRE' },
    { group: 'Team', id: 't-release', label: 'Release' },
    { group: 'Team', id: 't-architecture', label: 'Architecture' },
    { group: 'Team', id: 't-ux', label: 'UX' },
    { group: 'Team', id: 't-ui', label: 'UI' },
    { group: 'Team', id: 't-management', label: 'Management' },
  ];

  const groupOrder = ['Status', 'Priority', 'Team'] as const;

  const groupedTags = groupOrder.map((groupName) => ({
    items: tagsData.filter((t) => t.group === groupName),
    value: groupName,
  }));

  const flatItems = tagsData.map((t) => ({ label: t.label, value: t.id }));
</script>

<Autocomplete items={flatItems}>
  <AutocompleteInput aria-label="Search tags" placeholder="e.g. feature" />
  <AutocompletePopup>
    <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
    <AutocompleteList>
      {#each groupedTags as group (group.value)}
        <AutocompleteGroup>
          <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
          <AutocompleteCollection>
            {#each group.items as tag (tag.id)}
              <AutocompleteItem label={tag.label} value={tag.id}>{tag.label}</AutocompleteItem>
            {/each}
          </AutocompleteCollection>
        </AutocompleteGroup>
        {#if group.value !== 'Team'}
          <AutocompleteSeparator />
        {/if}
      {/each}
    </AutocompleteList>
  </AutocompletePopup>
</Autocomplete>
