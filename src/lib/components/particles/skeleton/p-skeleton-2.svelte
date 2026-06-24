<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton";
</script>

<div class="flex w-full max-w-92 items-center gap-4">
  <Skeleton class="size-10 rounded-full" />
  <div class="flex flex-1 flex-col">
    <Skeleton class="my-0.5 h-4 max-w-54" />
    <div class="flex max-w-54 items-center gap-1">
      <Skeleton class="my-0.5 h-4 w-1/2" />
      <Skeleton class="my-0.5 h-4 w-1/2" />
    </div>
  </div>
  <Skeleton class="h-6 w-17" />
</div>
