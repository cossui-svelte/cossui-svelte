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
  <InputGroupInput aria-label="Password" placeholder="Password" type="password" />
  <InputGroupAddon align="inline-end">
    <Popover>
      <PopoverTrigger
        aria-label="Password requirements"
        class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
      >
        <Info />
      </PopoverTrigger>
      <PopoverPopup side="top" tooltipStyle>
        <p>Min. 8 characters</p>
      </PopoverPopup>
    </Popover>
  </InputGroupAddon>
</InputGroup>
