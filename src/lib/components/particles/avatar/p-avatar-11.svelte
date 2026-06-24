<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import { Badge } from "$lib/components/ui/badge";
</script>

<div class="relative">
  <Avatar class="rounded-lg">
    <AvatarImage
      alt="User"
      src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
    />
    <AvatarFallback class="rounded-lg">LT</AvatarFallback>
  </Avatar>
  <Badge
    class="absolute -end-1.5 -top-1.5 rounded-full outline-2 outline-background outline-solid"
    size="sm"
  >
    6
  </Badge>
</div>
