<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';

  const id = $props.id();
</script>

<div class="flex gap-6">
  <div class="flex items-center gap-2">
    <Checkbox id="{id}-a" />
    <Label for="{id}-a">React</Label>
  </div>
  <div class="flex items-center gap-2">
    <Checkbox id="{id}-b" />
    <Label for="{id}-b">Next.js</Label>
  </div>
  <div class="flex items-center gap-2">
    <Checkbox id="{id}-c" />
    <Label for="{id}-c">Astro</Label>
  </div>
</div>
