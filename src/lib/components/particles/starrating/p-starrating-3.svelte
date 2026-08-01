<script lang="ts">
  import { StarRating } from '$lib/components/ui/starrating';
</script>

<div class="flex items-center gap-2">
  <StarRating allowHalf readonly value={4.5} />
  <span class="text-sm text-muted-foreground">4.5 (128 reviews)</span>
</div>
