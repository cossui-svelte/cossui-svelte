<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import { Input } from "$lib/components/ui/input";
</script>

<Group aria-label="Email subscription">
  <Input aria-label="Email" placeholder="Email" type="email" />
  <GroupSeparator />
  <Button variant="outline">Subscribe</Button>
</Group>
