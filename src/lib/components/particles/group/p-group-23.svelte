<script lang="ts">
  import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
  import Filter from "@lucide/svelte/icons/filter";
  import Search from "@lucide/svelte/icons/search";
  import X from "@lucide/svelte/icons/x";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/ui/avatar";
  import { Badge } from "$lib/components/ui/badge";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import {
    Combobox,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxTrigger,
  } from "$lib/components/ui/combobox";
  import { Group, GroupSeparator, GroupText } from "$lib/components/ui/group";
  import { cn } from "$lib/utils";

  type Member = { id: string; label: string; avatar?: string };

  const members: Member[] = [
    {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
      id: "alex-chen",
      label: "Alex Chen",
    },
    {
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
      id: "sarah-johnson",
      label: "Sarah Johnson",
    },
    {
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
      id: "marcus-williams",
      label: "Marcus Williams",
    },
    {
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
      id: "emma-davis",
      label: "Emma Davis",
    },
    {
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
      id: "james-miller",
      label: "James Miller",
    },
  ];

  function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0]?.charAt(0).toUpperCase() ?? "";
    return ((parts[0]?.charAt(0) ?? "") + (parts[parts.length - 1]?.charAt(0) ?? "")).toUpperCase();
  }

  let selectedIds = $state<string[]>(["alex-chen", "sarah-johnson"]);

  const firstMember = $derived(members.find((m) => m.id === selectedIds[0]));
  const remainingCount = $derived(selectedIds.length - 1);
</script>

<Group>
  <GroupText
    class={cn(buttonVariants({ size: "sm", variant: "outline" }), "pointer-events-none")}
  >
    <Filter aria-hidden />
    Member
  </GroupText>
  <GroupSeparator />
  <Combobox type="multiple" bind:value={selectedIds}>
    <ComboboxTrigger
      class={cn(
        buttonVariants({ size: "sm", variant: "outline" }),
        selectedIds.length > 0 ? undefined : "justify-between",
      )}
    >
      {#if selectedIds.length === 0}
        Select
        <ChevronsUpDown class="-me-1!" aria-hidden />
      {:else}
        <Avatar class="size-5">
          {#if firstMember?.avatar}
            <AvatarImage src={firstMember.avatar} alt={firstMember.label} />
          {/if}
          <AvatarFallback class="text-[0.5rem]">
            {getInitials(firstMember?.label ?? "")}
          </AvatarFallback>
        </Avatar>
        <span class="truncate">{firstMember?.label}</span>
        {#if remainingCount > 0}
          <Badge class="tabular-nums" variant="secondary">+{remainingCount}</Badge>
        {/if}
      {/if}
    </ComboboxTrigger>
    <ComboboxPopup aria-label="Select member">
      <div class="border-b p-2">
        <ComboboxInput placeholder="Search members..." showTrigger={false}>
          {#snippet startAddon()}<Search aria-hidden />{/snippet}
        </ComboboxInput>
      </div>
      <ComboboxEmpty>No members found.</ComboboxEmpty>
      <ComboboxList>
        {#each members as member (member.id)}
          <ComboboxItem value={member.id}>
            <Avatar class="size-5">
              {#if member.avatar}
                <AvatarImage src={member.avatar} alt={member.label} />
              {/if}
              <AvatarFallback class="text-[0.5rem]">
                {getInitials(member.label)}
              </AvatarFallback>
            </Avatar>
            <span>{member.label}</span>
          </ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxPopup>
  </Combobox>
  <GroupSeparator />
  <Button
    aria-label="Remove filter"
    onclick={() => { selectedIds = []; }}
    size="icon-sm"
    variant="outline"
  >
    <X aria-hidden />
  </Button>
</Group>
