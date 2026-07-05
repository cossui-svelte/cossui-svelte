<script lang="ts">
  import Eye from "@lucide/svelte/icons/eye";
  import EyeOff from "@lucide/svelte/icons/eye-off";
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";

  let showPassword = $state(false);
</script>

<TooltipProvider>
  <InputGroup>
    <InputGroupInput
      aria-label="Password with toggle visibility"
      placeholder="Enter your password"
      type={showPassword ? "text" : "password"}
    />
    <InputGroupAddon align="inline-end">
      <Tooltip>
        <TooltipTrigger
          aria-label={showPassword ? "Hide password" : "Show password"}
          class={buttonVariants({ size: "icon-xs", variant: "ghost" })}
          onclick={() => {
            showPassword = !showPassword;
          }}
        >
          {#if showPassword}<EyeOff />{:else}<Eye />{/if}
        </TooltipTrigger>
        <TooltipPopup>
          {showPassword ? "Hide password" : "Show password"}
        </TooltipPopup>
      </Tooltip>
    </InputGroupAddon>
  </InputGroup>
</TooltipProvider>
