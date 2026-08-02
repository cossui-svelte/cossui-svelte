<script lang="ts">
  import { StarRating, StarRatingValue } from '$lib/components/ui/starrating';

  let value = $state(3.5);
</script>

<div class="flex items-center gap-3">
  <StarRating allowHalf bind:value max={5} size="lg" />
  <StarRatingValue max={5} {value} />
</div>
