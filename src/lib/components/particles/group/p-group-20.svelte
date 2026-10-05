<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Group, GroupSeparator } from '#lib/components/ui/group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
</script>

<Group aria-label="Email subscription">
  <Input aria-label="Email" placeholder="Email" type="email" />
  <GroupSeparator />
  <Button variant="outline">Subscribe</Button>
</Group>
