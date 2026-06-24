<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
</script>

<div class="flex flex-col gap-2">
  <Label for="email-13">
    Email <span class="text-destructive">*</span>
  </Label>
  <Input id="email-13" placeholder="Email" required type="email" />
</div>
