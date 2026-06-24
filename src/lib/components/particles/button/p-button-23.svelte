<script lang="ts">
  import ThumbsUp from "@lucide/svelte/icons/thumbs-up";
  import { Button } from "$lib/components/ui/button";
</script>

<Button class="pe-0" variant="outline">
  <ThumbsUp aria-hidden="true" />
  Like
  <span class="relative ms-1 px-3 font-medium text-muted-foreground text-xs before:absolute before:inset-0 before:left-0 before:w-px before:bg-input">
    86
  </span>
</Button>
