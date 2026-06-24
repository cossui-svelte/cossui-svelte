<script lang="ts">
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import { Input } from "$lib/components/ui/input";
</script>

<Group aria-label="Add item">
  <Button aria-label="Add" size="icon" variant="outline">
    <Plus aria-hidden />
  </Button>
  <GroupSeparator />
  <Input aria-label="Item name" placeholder="Enter item name" type="text" />
</Group>
