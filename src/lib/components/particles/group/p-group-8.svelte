<script lang="ts">
  import { Group, GroupSeparator, GroupText } from "$lib/components/ui/group";
  import { Input } from "$lib/components/ui/input";
</script>

<Group aria-label="Domain input">
  <Input aria-label="Domain" id="domain-suffix" value="coss" type="text" />
  <GroupSeparator />
  <GroupText>.com</GroupText>
</Group>
