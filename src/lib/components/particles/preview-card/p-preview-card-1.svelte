<script lang="ts">
  import CornerUpLeft from "@lucide/svelte/icons/corner-up-left";
  import Star from "@lucide/svelte/icons/star";
  import { buttonVariants } from "$lib/components/ui/button";
  import PreviewCardPopup from "$lib/components/ui/preview-card/preview-card-popup.svelte";
  import {
    PreviewCard,
    PreviewCardTrigger,
  } from "$lib/components/ui/preview-card";
</script>

<PreviewCard>
  <PreviewCardTrigger class={buttonVariants({ variant: "ghost" })}>
    coss.com/ui
  </PreviewCardTrigger>
  <PreviewCardPopup>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h4 class="font-medium text-sm">coss.com/ui</h4>
        <p class="text-muted-foreground text-sm">
          Beautifully designed components that you can copy and paste into your apps.
        </p>
      </div>
      <div class="flex items-center gap-4 text-muted-foreground text-xs">
        <div class="flex items-center gap-1">
          <span aria-hidden="true" class="size-2 rounded-full bg-blue-500"></span>
          <span>TypeScript</span>
        </div>
        <div class="flex items-center gap-1">
          <Star class="size-3" />
          <span>58.2k</span>
        </div>
        <div class="flex items-center gap-1">
          <CornerUpLeft class="size-3" />
          <span>5.1k</span>
        </div>
      </div>
    </div>
  </PreviewCardPopup>
</PreviewCard>
