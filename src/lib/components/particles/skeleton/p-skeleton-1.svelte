<script lang="ts">
  import UserRoundPlusIcon from "@lucide/svelte/icons/user-round-plus";
  import UsersRoundIcon from "@lucide/svelte/icons/users-round";
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
  import { Skeleton } from "$lib/components/ui/skeleton";

  const users = [
    {
      delay: 3000,
      fallback: "SJ",
      followers: "15k",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&dpr=2&q=80",
      name: "Sarah Johnson",
      role: "Design Engineer",
    },
    {
      delay: 4000,
      fallback: "MA",
      followers: "8k",
      image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=80&h=80&dpr=2&q=80",
      name: "Mark Bennett Andersson",
      role: "Product Designer",
    },
    {
      delay: 3400,
      fallback: "AR",
      followers: "12k",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&dpr=2&q=80",
      name: "Alex Rivera",
      role: "UI/UX Designer",
    },
  ];

  type User = (typeof users)[0];

  interface UserCardState {
    isLoaded: boolean;
    user: User;
  }

  let cards = $state<UserCardState[]>(
    users.map((user) => ({ isLoaded: false, user })),
  );

  $effect(() => {
    const timers = users.map((user, i) =>
      setTimeout(() => {
        cards[i].isLoaded = true;
      }, user.delay),
    );
    return () => timers.forEach(clearTimeout);
  });
</script>

<div class="flex w-full max-w-92 flex-col gap-6">
  {#each cards as card (card.user.fallback)}
    <div class="flex items-center gap-4">
      {#if !card.isLoaded}
        <Skeleton class="size-10 rounded-full" />
        <div class="flex flex-1 flex-col">
          <Skeleton class="my-0.5 h-4 max-w-54" />
          <div class="flex max-w-54 items-center gap-1">
            <Skeleton class="my-0.5 h-4 w-1/2" />
            <Skeleton class="my-0.5 h-4 w-1/2" />
          </div>
        </div>
        <Skeleton class="h-7 w-19 sm:h-6 sm:w-17" />
      {:else}
        <Avatar class="size-10">
          <AvatarImage alt={card.user.name} src={card.user.image} />
          <AvatarFallback>{card.user.fallback}</AvatarFallback>
        </Avatar>
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <h4 class="line-clamp-1 font-medium text-sm">{card.user.name}</h4>
          <div class="flex items-center gap-3 text-muted-foreground text-xs">
            <span class="truncate">{card.user.role}</span>
            <div class="flex min-w-0 items-center gap-1">
              <UsersRoundIcon class="size-3 shrink-0" />
              <span class="truncate">
                {card.user.followers}
                <span class="max-sm:hidden"> followers</span>
              </span>
            </div>
          </div>
        </div>
        <Button size="xs">
          <UserRoundPlusIcon />
          Follow
        </Button>
      {/if}
    </div>
  {/each}
</div>
