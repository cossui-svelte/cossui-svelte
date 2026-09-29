<script lang="ts">
  import Star from '@lucide/svelte/icons/star';
  import { StarRating, type StarRatingState } from '$lib/components/ui/starrating';

  let value = $state(4);

  const colors = [
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-lime-500',
    'text-green-500'
  ];
</script>

{#snippet icon({ index, state }: { index: number; state: StarRatingState })}
  <Star class="text-muted-foreground" />
  <span
    class="absolute inset-0 overflow-hidden"
    style="width: {state === 'full' ? 100 : state === 'half' ? 50 : 0}%"
  >
    <Star class={`fill-current ${colors[index - 1]}`} />
  </span>
{/snippet}

<StarRating bind:value {icon} aria-label="Rate this product" />
