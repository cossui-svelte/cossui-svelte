<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";
</script>

<div class="flex flex-col gap-2">
  <Textarea placeholder="Type your message here" />
  <Button class="self-end">Send</Button>
</div>
