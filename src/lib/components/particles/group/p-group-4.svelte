<script lang="ts">
  import Archive from "@lucide/svelte/icons/archive";
  import Ellipsis from "@lucide/svelte/icons/ellipsis";
  import Files from "@lucide/svelte/icons/files";
  import Film from "@lucide/svelte/icons/film";
  import Pencil from "@lucide/svelte/icons/pencil";
  import Share from "@lucide/svelte/icons/share";
  import Trash from "@lucide/svelte/icons/trash";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from "$lib/components/ui/menu";
</script>

<Group aria-label="File actions">
  <Button size="lg" variant="outline">
    <Files aria-hidden />
    Files
  </Button>
  <GroupSeparator />
  <Button size="lg" variant="outline">
    <Film aria-hidden />
    Media
  </Button>
  <GroupSeparator />
  <Menu>
    <MenuTrigger aria-label="Menu" class={buttonVariants({ size: "icon-lg", variant: "outline" })}>
      <Ellipsis class="size-4" aria-hidden />
    </MenuTrigger>
    <MenuPopup align="end">
      <MenuItem>
        <Pencil aria-hidden />
        Edit
      </MenuItem>
      <MenuItem>
        <Archive aria-hidden />
        Archive
      </MenuItem>
      <MenuItem>
        <Share aria-hidden />
        Share
      </MenuItem>
      <MenuItem variant="destructive">
        <Trash aria-hidden />
        Delete
      </MenuItem>
    </MenuPopup>
  </Menu>
</Group>
