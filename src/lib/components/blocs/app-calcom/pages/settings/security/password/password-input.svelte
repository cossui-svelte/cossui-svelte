<script lang="ts">
  import EyeIcon from '@lucide/svelte/icons/eye';
  import EyeOffIcon from '@lucide/svelte/icons/eye-off';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';

  let { label, placeholder }: { label: string; placeholder: string } = $props();

  let show = $state(false);
</script>

<Field>
  <FieldLabel>{label}</FieldLabel>
  <InputGroup>
    <InputGroupInput aria-label={label} {placeholder} type={show ? 'text' : 'password'} />
    <InputGroupAddon align="inline-end">
      <Tooltip>
        <TooltipTrigger
          aria-label={show ? 'Hide password' : 'Show password'}
          class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
          onclick={() => (show = !show)}
          type="button"
        >
          {#if show}<EyeOffIcon />{:else}<EyeIcon />{/if}
        </TooltipTrigger>
        <TooltipPopup>{show ? 'Hide password' : 'Show password'}</TooltipPopup>
      </Tooltip>
    </InputGroupAddon>
  </InputGroup>
</Field>
