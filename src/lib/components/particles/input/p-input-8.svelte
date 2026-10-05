<script lang="ts">
  import Info from '@lucide/svelte/icons/info';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
</script>

<InputGroup>
  <InputGroupInput
    aria-label="Set your URL"
    class="*:[input]:ps-0!"
    placeholder="coss.com"
    type="text"
  />
  <InputGroupAddon>https://</InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <Popover>
      <PopoverTrigger
        aria-label="More info"
        class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
      >
        <Info />
      </PopoverTrigger>
      <PopoverPopup side="top" tooltipStyle>
        <p>The URL of your website</p>
      </PopoverPopup>
    </Popover>
  </InputGroupAddon>
</InputGroup>
