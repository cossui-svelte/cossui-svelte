<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
</script>

<Button class="rounded-full ps-1">
  <Avatar class="size-6">
    <AvatarImage
      alt="Luke Tracy"
      src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=128&h=128&dpr=2&q=80"
    />
    <AvatarFallback>LT</AvatarFallback>
  </Avatar>
  @georgelucas
</Button>
