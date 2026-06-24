<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
</script>

<div class="flex flex-col gap-2">
  <div class="inline-flex w-full items-center justify-between gap-2">
    <Label for="email-14">Email</Label>
    <span class="text-base/4.5 sm:text-sm/4 font-normal text-muted-foreground">Optional</span>
  </div>
  <Input id="email-14" placeholder="Email" type="email" />
</div>
