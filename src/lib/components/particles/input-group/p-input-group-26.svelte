<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import Eye from "@lucide/svelte/icons/eye";
  import EyeOff from "@lucide/svelte/icons/eye-off";
  import X from "@lucide/svelte/icons/x";
  import { Button } from "$lib/components/ui/button";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import { Label } from "$lib/components/ui/label";

  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  ];

  let password = $state("");
  let isVisible = $state(false);

  const strength = $derived(requirements.map((req) => ({
    met: req.regex.test(password),
    text: req.text,
  })));

  const strengthScore = $derived(strength.filter((req) => req.met).length);

  function getStrengthColor(score: number) {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  }

  function getStrengthText(score: number) {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  }
</script>

<div class="flex flex-col gap-3">
  <div class="flex flex-col gap-2">
    <Label for="password-26">Password</Label>
    <InputGroup>
      <InputGroupInput
        aria-describedby="password-26-description"
        id="password-26"
        bind:value={password}
        placeholder="Password"
        type={isVisible ? "text" : "password"}
      />
      <InputGroupAddon align="inline-end">
        <Button
          aria-label={isVisible ? "Hide password" : "Show password"}
          onclick={() => { isVisible = !isVisible; }}
          size="icon-xs"
          variant="ghost"
        >
          {#if isVisible}
            <EyeOff aria-hidden="true" />
          {:else}
            <Eye aria-hidden="true" />
          {/if}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  </div>

  <div
    aria-label="Password strength"
    aria-valuemax={4}
    aria-valuemin={0}
    aria-valuenow={strengthScore}
    class="h-1 w-full overflow-hidden rounded-full bg-border"
    role="progressbar"
    tabindex={-1}
  >
    <div
      class={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
      style="width: {(strengthScore / 4) * 100}%"
    ></div>
  </div>

  <p class="font-medium text-foreground text-sm" id="password-26-description">
    {getStrengthText(strengthScore)}. Must contain:
  </p>

  <ul aria-label="Password requirements" class="flex flex-col gap-1.5">
    {#each strength as req (req.text)}
      <li class="flex items-center gap-2">
        {#if req.met}
          <Check aria-hidden="true" class="size-4 text-emerald-500" />
        {:else}
          <X aria-hidden="true" class="size-4 text-muted-foreground/80" />
        {/if}
        <span class={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
          {req.text}
          <span class="sr-only">{req.met ? " - Requirement met" : " - Requirement not met"}</span>
        </span>
      </li>
    {/each}
  </ul>
</div>
