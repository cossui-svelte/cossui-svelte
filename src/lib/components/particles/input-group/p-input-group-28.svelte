<script lang="ts">
  import Image from "@lucide/svelte/icons/image";
  import Paperclip from "@lucide/svelte/icons/paperclip";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupTextarea,
  } from "$lib/components/ui/input-group";
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
</script>

<InputGroup>
  <InputGroupTextarea placeholder="Compose your message…" rows={4} />
  <InputGroupAddon align="block-end" class="justify-between">
    <TooltipProvider>
      <div class="flex gap-1">
        <Tooltip>
          <TooltipTrigger
            aria-label="Attach file"
            class={buttonVariants({ size: "icon-sm", variant: "ghost" })}
          >
            <Paperclip />
          </TooltipTrigger>
          <TooltipPopup>Attach file</TooltipPopup>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            aria-label="Insert image"
            class={buttonVariants({ size: "icon-sm", variant: "ghost" })}
          >
            <Image />
          </TooltipTrigger>
          <TooltipPopup>Insert image</TooltipPopup>
        </Tooltip>
      </div>
    </TooltipProvider>
    <Button size="sm">Send</Button>
  </InputGroupAddon>
</InputGroup>
