<script lang="ts">
  import Bell from "@lucide/svelte/icons/bell";
  import User from "@lucide/svelte/icons/user";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/ui/avatar";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import {
    Popover,
    PopoverDescription,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger,
  } from "$lib/components/ui/popover";

  type ActivePanel = "notifications" | "profile" | null;

  let open = $state(false);
  let activePanel = $state<ActivePanel>(null);

  function openWith(panel: ActivePanel) {
    activePanel = panel;
    open = true;
  }
</script>

<div class="flex gap-2">
  <button
    aria-label="Notifications"
    class={buttonVariants({ size: "icon", variant: "outline" })}
    onclick={() => openWith("notifications")}
    type="button"
  >
    <Bell aria-hidden="true" />
  </button>
  <button
    aria-label="Profile"
    class={buttonVariants({ size: "icon", variant: "outline" })}
    onclick={() => openWith("profile")}
    type="button"
  >
    <User aria-hidden="true" />
  </button>
  <Popover bind:open>
    <PopoverTrigger class="hidden" aria-hidden tabindex={-1} />
    <PopoverPopup class="min-w-none">
      {#if activePanel === "notifications"}
        <PopoverTitle class="text-base">Notifications</PopoverTitle>
        <PopoverDescription>
          You have no new notifications at this time.
        </PopoverDescription>
      {:else if activePanel === "profile"}
        <div class="w-48">
          <div class="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                alt="Mark Andersson"
                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
              />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div class="min-w-0 flex-1">
              <h4 class="line-clamp-1 font-medium text-sm">Mark Andersson</h4>
              <div class="flex items-center gap-3 text-muted-foreground text-xs">
                Product Designer
              </div>
            </div>
          </div>
          <Button class="mt-3 w-full" size="sm" variant="outline">Log out</Button>
        </div>
      {/if}
    </PopoverPopup>
  </Popover>
</div>
