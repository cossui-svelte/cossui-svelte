<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import { Button } from '$lib/components/ui/button';
</script>

<Button class="h-auto p-0 hover:bg-transparent" variant="ghost">
  <Avatar>
    <AvatarImage alt="Profile image" src="/img/avatars/avatar1.jpg" />
    <AvatarFallback>KK</AvatarFallback>
  </Avatar>
  <ChevronDownIcon aria-hidden="true" class="opacity-60" size={16} />
</Button>
