<script lang="ts">
  import { Group, GroupSeparator, GroupText } from "$lib/components/ui/group";
  import { Input } from "$lib/components/ui/input";
</script>

<Group aria-label="Price input">
  <Input
    aria-label="Enter the amount"
    class="text-right"
    id="amount"
    value="100"
    type="text"
  />
  <GroupSeparator />
  <GroupText>USD</GroupText>
</Group>
