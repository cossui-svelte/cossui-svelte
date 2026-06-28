<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea";

  const id = $props.id();
</script>

<Textarea
  {id}
  class="read-only:bg-muted"
  value="This is a read-only textarea"
  readonly
/>
