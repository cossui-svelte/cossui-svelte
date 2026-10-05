<script lang="ts">
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
</script>

<InputGroup>
  <InputGroupInput
    aria-label="Subscribe to our newsletter"
    disabled
    placeholder="Your best email"
    type="email"
  />
  <InputGroupAddon align="inline-end">
    <Button aria-label="Subscribe" disabled size="icon-xs" variant="ghost">
      <ArrowRight aria-hidden="true" />
    </Button>
  </InputGroupAddon>
</InputGroup>
