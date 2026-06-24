<script lang="ts">
  import User from "@lucide/svelte/icons/user";
  import { Avatar, AvatarFallback } from "$lib/components/ui/avatar";
</script>

<Avatar>
  <AvatarFallback>
    <User class="size-4" />
  </AvatarFallback>
</Avatar>
