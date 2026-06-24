<script lang="ts">
  import Info from "@lucide/svelte/icons/info";
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import {
    Tooltip,
    TooltipPopup,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
</script>

<InputGroup>
  <InputGroupAddon>
    <Tooltip>
      <TooltipTrigger
        aria-label="More information"
        class={buttonVariants({ size: "icon-xs", variant: "ghost" })}
      >
        <Info />
      </TooltipTrigger>
      <TooltipPopup>Enter your username</TooltipPopup>
    </Tooltip>
  </InputGroupAddon>
  <InputGroupInput
    aria-label="Username"
    placeholder="Username"
    type="text"
  />
</InputGroup>
