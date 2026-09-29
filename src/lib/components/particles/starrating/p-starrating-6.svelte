<script lang="ts">
  import Heart from '@lucide/svelte/icons/heart';
  import { StarRating, type StarRatingState } from '$lib/components/ui/starrating';

  let value = $state(3);
</script>

{#snippet icon({ state }: { index: number; state: StarRatingState })}
  <Heart class="text-muted-foreground" />
  <span
    class="absolute inset-0 overflow-hidden"
    style="width: {state === 'full' ? 100 : state === 'half' ? 50 : 0}%"
  >
    <Heart class="fill-rose-500 text-rose-500" />
  </span>
{/snippet}

<StarRating bind:value allowHalf {icon} aria-label="Rate this product" />
