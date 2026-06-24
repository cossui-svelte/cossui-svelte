<script lang="ts">
  import LoaderCircle from "@lucide/svelte/icons/loader-circle";
  import Mic from "@lucide/svelte/icons/mic";
  import Search from "@lucide/svelte/icons/search";
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

  let inputValue = $state("");
  let isLoading = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    clearTimeout(timer);
    if (inputValue) {
      isLoading = true;
      timer = setTimeout(() => { isLoading = false; }, 500);
    } else {
      isLoading = false;
    }
    return () => clearTimeout(timer);
  });
</script>

<InputGroup>
  <InputGroupAddon>
    {#if isLoading}
      <LoaderCircle aria-label="Loading..." class="animate-spin" role="status" />
    {:else}
      <Search aria-hidden="true" />
    {/if}
  </InputGroupAddon>
  <InputGroupInput
    aria-label="Search"
    bind:value={inputValue}
    placeholder="Search..."
    type="search"
  />
  <InputGroupAddon align="inline-end">
    <Tooltip>
      <TooltipTrigger
        aria-label="Voice search"
        class={buttonVariants({ size: "icon-xs", variant: "ghost" })}
      >
        <Mic aria-hidden="true" />
      </TooltipTrigger>
      <TooltipPopup>Voice search</TooltipPopup>
    </Tooltip>
  </InputGroupAddon>
</InputGroup>
