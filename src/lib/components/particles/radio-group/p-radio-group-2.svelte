<script lang="ts">
  import { Label } from '#lib/components/ui/label/index.js';
  import { Radio, RadioGroup } from '#lib/components/ui/radio-group/index.js';
</script>

<RadioGroup value="next">
  <Label><Radio value="next" /> Next.js</Label>
  <Label><Radio disabled value="vite" /> Vite (disabled)</Label>
  <Label><Radio value="astro" /> Astro</Label>
</RadioGroup>
