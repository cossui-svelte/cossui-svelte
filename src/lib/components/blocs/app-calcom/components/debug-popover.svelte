<script lang="ts">
  import { Label } from '#lib/components/ui/label/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { debug } from '../lib/debug.svelte.js';
</script>

<Popover>
  <PopoverTrigger
    class="cursor-pointer text-[0.625rem] text-sidebar-foreground/50 hover:text-sidebar-foreground/70"
  >
    Debug
  </PopoverTrigger>
  <PopoverPopup align="center" class="w-64" side="top">
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between gap-4">
        <Label for="delay-switch">Enable artificial delay</Label>
        <Switch bind:checked={debug.enableArtificialDelay} id="delay-switch" />
      </div>
      <div class="flex items-center justify-between gap-4">
        <Label for="loading-switch">Force loading state</Label>
        <Switch
          checked={debug.isLoadingOverride === true}
          id="loading-switch"
          onCheckedChange={(checked: boolean) => {
            debug.isLoadingOverride = checked ? true : null;
          }}
        />
      </div>
    </div>
  </PopoverPopup>
</Popover>
