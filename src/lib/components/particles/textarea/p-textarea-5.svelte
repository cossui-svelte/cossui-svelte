<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";

  const id = $props.id();
</script>

<div class="flex flex-col items-start gap-2">
  <Label for={id}>Message</Label>
  <Textarea id={id} placeholder="Type your message here" />
</div>
