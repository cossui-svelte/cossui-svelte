<script lang="ts">
  import { Group, GroupSeparator, GroupText } from '#lib/components/ui/group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
</script>

<Group aria-label="Domain input">
  <GroupText>https://</GroupText>
  <GroupSeparator />
  <Input aria-label="Domain" id="domain" value="coss.com" type="text" />
</Group>
