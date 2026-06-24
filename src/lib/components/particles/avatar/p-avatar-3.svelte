<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
</script>

<div class="flex items-center gap-4">
  <Avatar>
    <AvatarImage
      alt="User"
      src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80"
    />
    <AvatarFallback>AV</AvatarFallback>
  </Avatar>
  <Avatar class="size-12">
    <AvatarImage
      alt="User"
      src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=144&h=144&dpr=2&q=80"
    />
    <AvatarFallback>AV</AvatarFallback>
  </Avatar>
  <Avatar class="size-16">
    <AvatarImage
      alt="User"
      src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=192&h=192&dpr=2&q=80"
    />
    <AvatarFallback>AV</AvatarFallback>
  </Avatar>
</div>
