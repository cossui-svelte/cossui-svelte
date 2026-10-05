<script lang="ts">
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import Mic from '@lucide/svelte/icons/mic';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea
  } from '#lib/components/ui/input-group/index.js';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '#lib/components/ui/tooltip/index.js';
</script>

<TooltipProvider>
  <InputGroup>
    <InputGroupTextarea placeholder="Type a message…" />
    <InputGroupAddon align="block-end">
      <Tooltip>
        <TooltipTrigger
          aria-label="Voice message"
          class={`rounded-full ${buttonVariants({ size: 'icon-sm', variant: 'ghost' })}`}
        >
          <Mic />
        </TooltipTrigger>
        <TooltipPopup>Record voice message</TooltipPopup>
      </Tooltip>
      <InputGroupText class="ml-auto text-muted-foreground text-xs">
        Press Enter to send
      </InputGroupText>
      <Tooltip>
        <TooltipTrigger
          aria-label="Send message"
          class={`rounded-full ${buttonVariants({ size: 'icon-sm' })}`}
        >
          <ArrowRight />
        </TooltipTrigger>
        <TooltipPopup>Send</TooltipPopup>
      </Tooltip>
    </InputGroupAddon>
  </InputGroup>
</TooltipProvider>
