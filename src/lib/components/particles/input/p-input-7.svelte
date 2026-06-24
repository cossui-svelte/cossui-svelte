<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Group } from "$lib/components/ui/group";
  import { Input } from "$lib/components/ui/input";
</script>

<Group aria-label="Email subscription" class="gap-2">
  <Input aria-label="Email" class="flex-1" placeholder="you@example.com" type="email" />
  <div>
    <Button variant="outline">Send</Button>
  </div>
</Group>
