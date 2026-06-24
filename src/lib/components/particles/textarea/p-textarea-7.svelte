<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
</script>

<div class="flex flex-col gap-2">
  <Label for="message-7">
    Message <span class="text-destructive">*</span>
  </Label>
  <Textarea id="message-7" placeholder="Type your message here" required />
</div>
