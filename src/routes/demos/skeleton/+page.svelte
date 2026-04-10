<script lang="ts">
    import ComponentPreviewTab from "$lib/components/app/ComponentPreviewTabs.svelte";
    import {
        Avatar,
        AvatarFallback,
        AvatarImage,
    } from "$lib/components/ui/avatar";
    import { Button } from "$lib/components/ui/button";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { UserRoundPlusIcon, UsersRoundIcon } from "lucide-svelte";

    let loading = $state(true);

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

    const user = users[0];

    setTimeout(() => {
        loading = false;
    }, 4000);
</script>

<ComponentPreviewTab>
    <div
        class="flex h-[450px] w-full justify-center overflow-y-auto p-10 data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center max-sm:px-6"
        data-align="center"
    >
        <div data-slot="preview">
            <div class="flex w-full max-w-92 flex-col gap-6">
                <Skeleton {loading} reveal={0.4} stagger={0.03}>
                    <div class="flex items-center gap-4">
                        <Avatar class="size-10">
                            <AvatarImage alt={user.name} src={user.image} />
                            <AvatarFallback>{user.fallback}</AvatarFallback>
                        </Avatar>
                        <div class="flex min-w-0 flex-1 flex-col gap-1">
                            <h4 class="line-clamp-1 font-medium text-sm">
                                {user.name}
                            </h4>
                            <div
                                class="flex items-center gap-3 text-muted-foreground text-xs"
                            >
                                <span class="truncate">{user.role}</span>
                                <div class="flex min-w-0 items-center gap-1">
                                    <UsersRoundIcon class="size-3 shrink-0" />
                                    <span class="truncate">
                                        {user.followers}
                                        <span class="max-sm:hidden">
                                            {" "}
                                            followers
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Button size="xs">
                            <UserRoundPlusIcon />
                            Follow
                        </Button>
                    </div>
                </Skeleton>
            </div>
        </div>
    </div>
</ComponentPreviewTab>
