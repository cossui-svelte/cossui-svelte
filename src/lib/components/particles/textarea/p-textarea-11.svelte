<script lang="ts">
  import { Field, FieldDescription } from "$lib/components/ui/field";
  import { Textarea } from "$lib/components/ui/textarea";

  const maxlength = 280;
  let value = $state("");
</script>

<Field>
  <Textarea
    aria-label="Message"
    {maxlength}
    onchange={(e) => value = (e.target.value)}
    placeholder="Type your message here"
    {value}
  />
  <FieldDescription>
    <span class="tabular-nums">{maxlength - value.length}</span>{" "}
    characters left
  </FieldDescription>
</Field>
