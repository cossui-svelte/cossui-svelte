<script lang="ts">
  import { StarRating } from '#lib/components/ui/starrating/index.js';

  let value = $state(3);
</script>

<StarRating bind:value aria-label="Rate this product" />
