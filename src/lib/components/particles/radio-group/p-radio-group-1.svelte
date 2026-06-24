<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Radio, RadioGroup } from "$lib/components/ui/radio-group";
</script>

<RadioGroup value="next">
  <Label><Radio value="next" /> Next.js</Label>
  <Label><Radio value="vite" /> Vite</Label>
  <Label><Radio value="astro" /> Astro</Label>
</RadioGroup>
