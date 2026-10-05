<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Textarea } from '#lib/components/ui/textarea/index.js';
</script>

<div class="flex flex-col gap-2">
  <Textarea placeholder="Type your message here" />
  <Button class="self-start">Send</Button>
</div>
