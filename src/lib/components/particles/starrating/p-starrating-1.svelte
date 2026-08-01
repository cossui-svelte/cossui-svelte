<script lang="ts">
  import { StarRating } from '$lib/components/ui/starrating';

  let value = $state(3);
</script>

<StarRating bind:value aria-label="Rate this product" />
