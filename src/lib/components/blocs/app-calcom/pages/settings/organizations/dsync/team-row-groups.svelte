<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
  import XIcon from '@lucide/svelte/icons/x';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Group, GroupSeparator, GroupText } from '#lib/components/ui/group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { cn } from '#lib/utils.js';

  let {
    groupNames,
    onAddGroup,
    onRemoveGroup,
    teamId
  }: {
    teamId: string;
    groupNames: string[];
    onAddGroup: (teamId: string, name: string) => void;
    onRemoveGroup: (teamId: string, name: string) => void;
  } = $props();

  let open = $state(false);
  let draft = $state('');
  let inputRef = $state<HTMLInputElement | null>(null);

  $effect(() => {
    if (!open) {
      return;
    }
    const id = requestAnimationFrame(() => {
      inputRef?.focus();
    });
    return () => cancelAnimationFrame(id);
  });

  const addDisabled = $derived(draft.trim().length === 0);

  function handleAdd(): void {
    if (addDisabled) {
      return;
    }
    onAddGroup(teamId, draft.trim());
    draft = '';
    open = false;
  }

  function handleOpenChange(next: boolean): void {
    open = next;
    if (!next) {
      draft = '';
    }
  }
</script>

<div class="flex flex-wrap gap-2">
  {#each groupNames as name (`${teamId}-${name}`)}
    <Group aria-label={`Directory group ${name}`}>
      <GroupText
        class={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'pointer-events-none')}
      >
        {name}
      </GroupText>
      <GroupSeparator />
      <Button
        aria-label={`Remove group ${name}`}
        onclick={() => onRemoveGroup(teamId, name)}
        size="icon-sm"
        type="button"
        variant="outline"
      >
        <XIcon aria-hidden="true" />
      </Button>
    </Group>
  {/each}
  <Popover {open} onOpenChange={handleOpenChange}>
    <PopoverTrigger class={buttonVariants({ size: 'sm', variant: 'outline' })} type="button">
      <PlusIcon aria-hidden="true" />
      Group name
    </PopoverTrigger>
    <PopoverPopup align="start" class="min-w-64 transition-none">
      <div class="flex flex-col gap-2">
        <Input
          bind:ref={inputRef}
          bind:value={draft}
          aria-label="Group name"
          class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
          placeholder="Enter group name"
          size="sm"
          type="text"
        />
        <Button
          class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
          disabled={addDisabled}
          onclick={handleAdd}
          size="sm"
          type="button"
          variant="outline"
        >
          Add
        </Button>
      </div>
    </PopoverPopup>
  </Popover>
</div>
