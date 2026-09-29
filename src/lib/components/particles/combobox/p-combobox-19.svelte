<script lang="ts">
  import Search from '@lucide/svelte/icons/search';
  import X from '@lucide/svelte/icons/x';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import {
    Combobox,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup
  } from '$lib/components/ui/combobox';

  type TeamMember = {
    avatar: string;
    initials: string;
    label: string;
    priority: 'Lowest' | 'Low' | 'Medium' | 'High' | 'Highest';
    value: string;
    weight: number;
  };

  const teamMembers: TeamMember[] = [
    {
      avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=72&h=72&dpr=2&q=80',
      initials: 'JH',
      label: 'Jenny Hamilton',
      priority: 'Highest',
      value: 'jenny',
      weight: 200
    },
    {
      avatar: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=72&h=72&dpr=2&q=80',
      initials: 'PS',
      label: 'Paul Smith',
      priority: 'Medium',
      value: 'paul',
      weight: 100
    },
    {
      avatar: 'https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=72&h=72&dpr=2&q=80',
      initials: 'LW',
      label: 'Luna Wyen',
      priority: 'High',
      value: 'luna',
      weight: 150
    },
    {
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=72&h=72&dpr=2&q=80',
      initials: 'AC',
      label: 'Alex Chen',
      priority: 'Low',
      value: 'alex',
      weight: 100
    },
    {
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=72&h=72&dpr=2&q=80',
      initials: 'SJ',
      label: 'Sarah Johnson',
      priority: 'Medium',
      value: 'sarah',
      weight: 50
    },
    {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=72&h=72&dpr=2&q=80',
      initials: 'ED',
      label: 'Emma Davis',
      priority: 'Lowest',
      value: 'emma',
      weight: 100
    }
  ];

  let open = $state(false);
  let selectedValues = $state<string[]>(teamMembers.slice(0, 2).map((m) => m.value));
  const selected = $derived(selectedValues.map((v) => teamMembers.find((m) => m.value === v)!));

  function removeMember(value: string) {
    selectedValues = selectedValues.filter((v) => v !== value);
  }
</script>

<div class="flex w-full flex-col gap-2">
  <Combobox
    autoHighlight
    multiple
    bind:open
    bind:value={selectedValues}
    items={teamMembers}
    onValueChange={() => (open = false)}
  >
    <ComboboxInput aria-label="Add team members" placeholder="Add team members…">
      {#snippet startAddon()}
        <Search />
      {/snippet}
    </ComboboxInput>
    <ComboboxPopup>
      <ComboboxEmpty>No team members found.</ComboboxEmpty>
      <ComboboxList>
        <ComboboxCollection>
          {#snippet children(item: TeamMember)}
            <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
          {/snippet}
        </ComboboxCollection>
      </ComboboxList>
    </ComboboxPopup>
  </Combobox>
  {#if selected.length > 0}
    <ul class="flex flex-col gap-2">
      {#each selected as member (member.value)}
        <li
          class="flex items-center gap-2 rounded-lg border border-input p-1 ps-2 text-base sm:text-sm"
        >
          <Avatar class="size-5">
            <AvatarImage alt={member.label} src={member.avatar} />
            <AvatarFallback class="text-[.625rem]">{member.initials}</AvatarFallback>
          </Avatar>
          <span class="truncate font-medium">{member.label}</span>
          <Badge class="ms-auto" variant="outline">{member.priority}</Badge>
          <span class="text-muted-foreground tabular-nums">{member.weight}%</span>
          <Button
            aria-label={`Remove ${member.label}`}
            onclick={() => removeMember(member.value)}
            size="icon-xs"
            variant="ghost"
          >
            <X />
          </Button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
