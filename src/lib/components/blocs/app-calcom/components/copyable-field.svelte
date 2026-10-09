<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import ClipboardIcon from '@lucide/svelte/icons/clipboard';
  import type { Snippet } from 'svelte';
  import { onDestroy } from 'svelte';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import { anchoredToastManager, toastManager } from '#lib/components/ui/toast/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import { cn } from '#lib/utils.js';

  const RESET_DELAY = 2000;

  let {
    label,
    value,
    monospace = false,
    'aria-label': ariaLabel,
    description,
    copyTooltip = 'Copy to clipboard',
    copiedTooltip = 'Copied!',
    onCopySuccess,
    'data-testid': dataTestId
  }: {
    label: string;
    value: string;
    monospace?: boolean;
    'aria-label'?: string;
    description?: Snippet | string;
    copyTooltip?: string;
    copiedTooltip?: string;
    onCopySuccess?: () => void;
    'data-testid'?: string;
  } = $props();

  let buttonRef = $state<HTMLElement | null>(null);
  let isCopied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => clearTimeout(timer));

  async function handleCopy() {
    if (isCopied) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    isCopied = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      isCopied = false;
    }, RESET_DELAY);
    if (buttonRef) {
      anchoredToastManager.add({
        data: { tooltipStyle: true },
        positionerProps: { anchor: buttonRef },
        timeout: RESET_DELAY,
        title: copiedTooltip,
        type: 'success'
      });
    } else {
      toastManager.add({ title: copiedTooltip, type: 'success' });
    }
    onCopySuccess?.();
  }
</script>

<Field>
  <FieldLabel>{label}</FieldLabel>
  <InputGroup>
    <InputGroupInput
      aria-label={ariaLabel ?? label}
      class={cn('*:truncate', monospace && 'font-mono')}
      data-testid={dataTestId}
      readonly
      {value}
    />
    <InputGroupAddon align="inline-end">
      <Tooltip>
        <TooltipTrigger
          bind:ref={buttonRef}
          aria-label={`Copy ${label}`}
          class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
          disabled={isCopied}
          onclick={handleCopy}
          type="button"
        >
          {#if isCopied}
            <CheckIcon aria-hidden="true" />
          {:else}
            <ClipboardIcon aria-hidden="true" />
          {/if}
        </TooltipTrigger>
        <TooltipPopup>
          <p>{isCopied ? copiedTooltip : copyTooltip}</p>
        </TooltipPopup>
      </Tooltip>
    </InputGroupAddon>
  </InputGroup>
  {#if description}
    <FieldDescription>
      {#if typeof description === 'string'}{description}{:else}{@render description()}{/if}
    </FieldDescription>
  {/if}
</Field>
