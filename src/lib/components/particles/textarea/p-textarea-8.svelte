<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";

   const id = $props.id();
</script>

    <div class="flex flex-col gap-2">
      <div class="inline-flex w-full items-center justify-between gap-2">
        <Label for={id}>Message</Label>
        <Label class="font-normal text-muted-foreground" >
        <span>Optional</span>
          
        </Label>
      </div>
      <Textarea id={id} placeholder="Type your message here" />
    </div>
