<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea";

  const maxLength = 280;
  let value = $state("");
</script>

<div class="flex flex-col gap-1.5">
  <Textarea
    aria-label="Message"
    maxlength={maxLength}
    oninput={(e) => { value = (e.currentTarget as HTMLTextAreaElement).value; }}
    placeholder="Type your message here"
    {value}
  />
  <p class="text-muted-foreground text-sm">
    <span class="tabular-nums">{maxLength - value.length}</span> characters left
  </p>
</div>
