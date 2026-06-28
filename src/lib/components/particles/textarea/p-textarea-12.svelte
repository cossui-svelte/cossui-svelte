<script lang="ts">
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { Textarea } from "$lib/components/ui/textarea";
</script>

<Field class="flex flex-col gap-1.5">
  <FieldLabel class="text-sm font-medium" for="message-12">
    Message <span class="text-destructive-foreground">*</span>
  </FieldLabel>
  <Textarea id="message-12" placeholder="Type your message here" required />
  <p class="text-destructive text-sm">Please fill out this field.</p>
</Field>
