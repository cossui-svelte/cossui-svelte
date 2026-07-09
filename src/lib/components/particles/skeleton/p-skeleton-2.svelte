<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton";
</script>

<Skeleton loading={true} class="flex w-full max-w-92 items-center gap-4">
  <div class="size-10 rounded-full"></div>
  <div class="flex flex-1 flex-col">
    <div class="my-0.5 h-4 max-w-54"></div>
    <div class="flex max-w-54 items-center gap-1">
      <div class="my-0.5 h-4 w-1/2"></div>
      <div class="my-0.5 h-4 w-1/2"></div>
    </div>
  </div>
  <div class="h-6 w-17"></div>
</Skeleton>
