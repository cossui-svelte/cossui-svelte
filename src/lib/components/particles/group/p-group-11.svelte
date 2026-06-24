<script lang="ts">
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import GitFork from "@lucide/svelte/icons/git-fork";
  import { Badge } from "$lib/components/ui/badge";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import {
    Popover,
    PopoverDescription,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger,
  } from "$lib/components/ui/popover";
</script>

<Group aria-label="Repository actions">
  <Button variant="outline">
    <GitFork aria-hidden />
    Fork
    <Badge variant="secondary">48</Badge>
  </Button>
  <GroupSeparator />
  <Popover>
    <PopoverTrigger aria-label="Send options" class={buttonVariants({ size: "icon", variant: "outline" })}>
      <ChevronDown aria-hidden />
    </PopoverTrigger>
    <PopoverPopup align="end" class="w-64">
      <PopoverTitle class="text-base">Existing forks</PopoverTitle>
      <PopoverDescription>
        You don't have any forks of this repository.
      </PopoverDescription>
    </PopoverPopup>
  </Popover>
</Group>
