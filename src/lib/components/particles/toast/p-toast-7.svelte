<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import { buttonVariants } from '$lib/components/ui/button';
  import { anchoredToastManager } from '$lib/components/ui/toast';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '$lib/components/ui/tooltip';

  const toastTimeout = 2000;

  let isCopied = $state(false);

  function handleCopy(e: MouseEvent) {
    if (isCopied) return;
    const anchor = e.currentTarget as HTMLButtonElement;
    navigator.clipboard.writeText('https://cossui-svelte.com');
    isCopied = true;
    anchoredToastManager.add({
      data: { tooltipStyle: true },
      positionerProps: { anchor },
      timeout: toastTimeout,
      title: 'Copied!'
    });
    setTimeout(() => {
      isCopied = false;
    }, toastTimeout);
  }
</script>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger
      aria-label="Copy link"
      class={buttonVariants({ size: 'icon', variant: 'outline' })}
      disabled={isCopied}
      onclick={handleCopy}
    >
      {#if isCopied}
        <CheckIcon class="size-4" />
      {:else}
        <CopyIcon class="size-4" />
      {/if}
    </TooltipTrigger>
    <TooltipPopup>
      <p>Copy to clipboard</p>
    </TooltipPopup>
  </Tooltip>
</TooltipProvider>
