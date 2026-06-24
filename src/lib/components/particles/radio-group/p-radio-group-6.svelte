<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Radio, RadioGroup } from "$lib/components/ui/radio-group";

  const items = [
    { label: "System", value: "system" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ] as const;
</script>

<fieldset class="flex w-full flex-col gap-4">
  <legend class="font-medium text-sm">Choose a theme</legend>
  <RadioGroup class="flex-row gap-4" value="system">
    {#each items as item (item.value)}
      <Label class="cursor-pointer flex-col">
        <Radio class="peer sr-only absolute" value={item.value} />
        <span class="relative block h-[70px] w-[88px] overflow-hidden rounded-lg not-peer-data-checked:opacity-80 shadow-xs transition-shadow peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-64 peer-data-checked:ring-2 peer-data-checked:ring-primary/48 peer-data-checked:ring-offset-1 peer-data-checked:ring-offset-background">
          {#if item.value === "dark"}
            <svg aria-hidden class="size-full" fill="none" viewBox="0 0 88 70" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-neutral-900" d="M0 0h88v70H0z" />
              <path class="fill-neutral-800 shadow-sm" d="M10 12a4 4 0 0 1 4-4h74v62H10V12Z" />
              <circle class="fill-neutral-600" cx="28" cy="26" r="8" />
              <rect class="fill-neutral-700" height="4" rx="2" width="58" x="20" y="42" />
              <rect class="fill-neutral-700" height="4" rx="2" width="58" x="20" y="49" />
              <rect class="fill-neutral-700" height="4" rx="2" width="29" x="20" y="56" />
            </svg>
          {:else if item.value === "light"}
            <svg aria-hidden class="size-full" fill="none" viewBox="0 0 88 70" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-neutral-200" d="M0 0h88v70H0z" />
              <path class="fill-white shadow-sm" d="M10 12a4 4 0 0 1 4-4h74v62H10V12Z" />
              <circle class="fill-neutral-300" cx="28" cy="26" r="8" />
              <rect class="fill-neutral-200" height="4" rx="2" width="58" x="20" y="42" />
              <rect class="fill-neutral-200" height="4" rx="2" width="58" x="20" y="49" />
              <rect class="fill-neutral-200" height="4" rx="2" width="29" x="20" y="56" />
            </svg>
          {:else}
            <svg aria-hidden class="size-full" fill="none" viewBox="0 0 88 70" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-neutral-200" d="M0 0h44v70H0z" />
              <path class="fill-neutral-900" d="M44 0h44v70H44z" />
              <path class="fill-white shadow-sm" d="M10 12a4 4 0 0 1 4-4h30v62H10V12Z" />
              <circle class="fill-neutral-300" cx="28" cy="26" r="8" />
              <path class="fill-neutral-200" d="M20 44a2 2 0 0 1 2-2h22v4H22a2 2 0 0 1-2-2ZM20 51a2 2 0 0 1 2-2h22v4H22a2 2 0 0 1-2-2ZM20 58a2 2 0 0 1 2-2h22v4H22a2 2 0 0 1-2-2Z" />
              <path class="fill-neutral-800 shadow-sm" d="M54 12a4 4 0 0 1 4-4h30v62H54V12Z" />
              <circle class="fill-neutral-600" cx="72" cy="26" r="8" />
              <path class="fill-neutral-700" d="M64 44a2 2 0 0 1 2-2h22v4H66a2 2 0 0 1-2-2ZM64 51a2 2 0 0 1 2-2h22v4H66a2 2 0 0 1-2-2ZM64 58a2 2 0 0 1 2-2h22v4H66a2 2 0 0 1-2-2Z" />
            </svg>
          {/if}
        </span>
        <span class="not-peer-data-checked:text-muted-foreground/70">{item.label}</span>
      </Label>
    {/each}
  </RadioGroup>
</fieldset>
