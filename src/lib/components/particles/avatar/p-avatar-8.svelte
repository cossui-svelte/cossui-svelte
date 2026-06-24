<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
</script>

<div class="relative">
  <Avatar>
    <AvatarImage
      alt="User"
      src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
    />
    <AvatarFallback>LT</AvatarFallback>
  </Avatar>
  <span
    aria-hidden="true"
    class="absolute end-0 bottom-0 size-2 rounded-full bg-muted-foreground outline-2 outline-background"
  />
</div>
