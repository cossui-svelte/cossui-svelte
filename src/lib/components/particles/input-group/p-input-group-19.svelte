<script lang="ts">
  import Bold from '@lucide/svelte/icons/bold';
  import Italic from '@lucide/svelte/icons/italic';
  import Link from '@lucide/svelte/icons/link';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupTextarea
  } from '#lib/components/ui/input-group/index.js';
  import { Toggle } from '#lib/components/ui/toggle/index.js';
</script>

<InputGroup>
  <InputGroupTextarea placeholder="Tell us about yourself…" />
  <InputGroupAddon align="block-start" class="gap-1 rounded-t-lg border-b bg-muted/72 p-2!">
    <Toggle aria-label="Toggle bold" size="sm">
      <Bold aria-hidden="true" />
    </Toggle>
    <Toggle aria-label="Toggle italic" size="sm">
      <Italic aria-hidden="true" />
    </Toggle>
    <Button aria-label="Link" size="icon-sm" variant="ghost">
      <Link aria-hidden="true" />
    </Button>
  </InputGroupAddon>
</InputGroup>
