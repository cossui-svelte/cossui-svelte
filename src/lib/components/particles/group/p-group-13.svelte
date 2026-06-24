<script lang="ts">
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import Download from "@lucide/svelte/icons/download";
  import Pencil from "@lucide/svelte/icons/pencil";
  import Share from "@lucide/svelte/icons/share";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from "$lib/components/ui/menu";
</script>

<Group aria-label="Subscription actions">
  <Button>Subscribe</Button>
  <GroupSeparator class="bg-primary/72" />
  <Menu>
    <MenuTrigger aria-label="Copy options" class={buttonVariants({ size: "icon" })}>
      <ChevronDown class="size-4" aria-hidden />
    </MenuTrigger>
    <MenuPopup align="end">
      <MenuItem>
        <Share aria-hidden />
        Share link
      </MenuItem>
      <MenuItem>
        <Download aria-hidden />
        Download
      </MenuItem>
      <MenuItem>
        <Pencil aria-hidden />
        Duplicate
      </MenuItem>
    </MenuPopup>
  </Menu>
</Group>
