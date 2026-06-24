<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Radio, RadioGroup } from "$lib/components/ui/radio-group";
</script>

<RadioGroup value="r-1">
  <div class="flex items-start gap-2">
    <Radio id="r-1" value="r-1" />
    <div class="flex flex-col gap-1">
      <Label for="r-1">Free</Label>
      <p class="text-muted-foreground text-xs">Basic features for personal use.</p>
    </div>
  </div>
  <div class="flex items-start gap-2">
    <Radio id="r-2" value="r-2" />
    <div class="flex flex-col gap-1">
      <Label for="r-2">Pro</Label>
      <p class="text-muted-foreground text-xs">Advanced tools for professionals.</p>
    </div>
  </div>
</RadioGroup>
