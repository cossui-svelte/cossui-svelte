<script lang="ts">
  import CopyIcon from '@lucide/svelte/icons/copy';
  import { onDestroy } from 'svelte';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { anchoredToastManager } from '#lib/components/ui/toast/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';

  const linkUrl = 'https://cal.com/org/cal-com';
  const toastTimeout = 2000;
  const resetDelay = 2000;

  let buttonRef = $state<HTMLElement | null>(null);
  let toastId: string | null = null;
  let isCopied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => clearTimeout(timer));

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(linkUrl);
      isCopied = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        isCopied = false;
      }, resetDelay);
    } catch {
      // clipboard unavailable
    }

    if (toastId) {
      anchoredToastManager.close(toastId);
      toastId = null;
    }

    if (buttonRef) {
      toastId = anchoredToastManager.add({
        data: { tooltipStyle: true },
        positionerProps: { anchor: buttonRef, sideOffset: 4 },
        timeout: toastTimeout,
        title: 'Copied!',
        type: 'success'
      });
    }
  }
</script>

<div bind:this={buttonRef} class="inline-flex">
  <Tooltip>
    <TooltipTrigger
      aria-label="Copy link to organization"
      class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
      onclick={handleClick}
    >
      <CopyIcon aria-hidden="true" />
    </TooltipTrigger>
    <TooltipPopup>
      <p>{isCopied ? 'Copied!' : 'Copy link to organization'}</p>
    </TooltipPopup>
  </Tooltip>
</div>
