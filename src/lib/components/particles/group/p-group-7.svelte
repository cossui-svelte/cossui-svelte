<script lang="ts">
  import { Group, GroupSeparator, GroupText } from "$lib/components/ui/group";
  import { Input } from "$lib/components/ui/input";
</script>

<Group aria-label="Domain input">
  <GroupText>https://</GroupText>
  <GroupSeparator />
  <Input aria-label="Domain" id="domain" value="coss.com" type="text" />
</Group>
