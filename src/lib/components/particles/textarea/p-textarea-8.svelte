<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
</script>

<div class="flex flex-col gap-2">
  <div class="inline-flex w-full items-center justify-between gap-2">
    <Label for="message-8">Message</Label>
    <span class="font-normal text-muted-foreground text-sm">Optional</span>
  </div>
  <Textarea id="message-8" placeholder="Type your message here" />
</div>
