<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea";
</script>

<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium" for="message-12">
    Message <span class="text-destructive-foreground">*</span>
  </label>
  <Textarea id="message-12" placeholder="Type your message here" required />
  <p class="text-destructive text-sm">Please fill out this field.</p>
</div>
