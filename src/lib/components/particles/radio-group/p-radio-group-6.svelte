<script lang="ts">
  import { z } from "zod";
  import { Field, FieldItem, FieldLabel } from "$lib/components/ui/field";
  import { Fieldset, FieldsetLegend } from "$lib/components/ui/fieldset";
  import Form from "$lib/components/ui/form/form.svelte";
  import { Radio, RadioGroup } from "$lib/components/ui/radio-group";
  import { createForm } from "$lib/hooks/use-superform";

  const items = [
    { label: "System", value: "system" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ] as const;

  const schema = z.object({
    theme: z.string(),
  });

  const superform = createForm({
    initialData: { theme: "system" },
    onUpdated: ({ theme }) => alert(`Selected theme: ${theme}`),
    schema,
  });

  const { form } = superform;
</script>

{#snippet themePreviews(v)}
  {#if v === "dark"}
    <svg
      aria-hidden
      class="size-full"
      fill="none"
      viewBox="0 0 88 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path class="fill-neutral-900" d="M0 0h88v70H0z"></path>
      <path
        class="fill-neutral-800 shadow-sm"
        d="M10 12a4 4 0 0 1 4-4h74v62H10V12Z"
      ></path>
      <circle class="fill-neutral-600" cx="28" cy="26" r="8"></circle>
      <rect class="fill-neutral-700" height="4" rx="2" width="58" x="20" y="42"
      ></rect>
      <rect class="fill-neutral-700" height="4" rx="2" width="58" x="20" y="49"
      ></rect>
      <rect class="fill-neutral-700" height="4" rx="2" width="29" x="20" y="56"
      ></rect>
    </svg>
  {:else if v === "light"}
    <svg
      aria-hidden
      class="size-full"
      fill="none"
      viewBox="0 0 88 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path class="fill-neutral-200" d="M0 0h88v70H0z"></path>
      <path class="fill-white shadow-sm" d="M10 12a4 4 0 0 1 4-4h74v62H10V12Z"
      ></path>
      <circle class="fill-neutral-300" cx="28" cy="26" r="8"></circle>
      <rect class="fill-neutral-200" height="4" rx="2" width="58" x="20" y="42"
      ></rect>
      <rect class="fill-neutral-200" height="4" rx="2" width="58" x="20" y="49"
      ></rect>
      <rect class="fill-neutral-200" height="4" rx="2" width="29" x="20" y="56"
      ></rect>
    </svg>
  {:else}
    <svg
      aria-hidden
      class="size-full"
      fill="none"
      viewBox="0 0 88 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path class="fill-neutral-200" d="M0 0h44v70H0z"></path>
      <path class="fill-neutral-900" d="M44 0h44v70H44z"></path>
      <path class="fill-white shadow-sm" d="M10 12a4 4 0 0 1 4-4h30v62H10V12Z"
      ></path>
      <circle class="fill-neutral-300" cx="28" cy="26" r="8"></circle>
      <path
        class="fill-neutral-200"
        d="M20 44a2 2 0 0 1 2-2h22v4H22a2 2 0 0 1-2-2ZM20 51a2 2 0 0 1 2-2h22v4H22a2 2 0 0 1-2-2ZM20 58a2 2 0 0 1 2-2h22v4H22a2 2 0 0 1-2-2Z"
      ></path>
      <path
        class="fill-neutral-800 shadow-sm"
        d="M54 12a4 4 0 0 1 4-4h30v62H54V12Z"
      ></path>
      <circle class="fill-neutral-600" cx="72" cy="26" r="8"></circle>
      <path
        class="fill-neutral-700"
        d="M64 44a2 2 0 0 1 2-2h22v4H66a2 2 0 0 1-2-2ZM64 51a2 2 0 0 1 2-2h22v4H66a2 2 0 0 1-2-2ZM64 58a2 2 0 0 1 2-2h22v4H66a2 2 0 0 1-2-2Z"
      ></path>
    </svg>
  {/if}
{/snippet}

<Form {superform}>
  <Field class="gap-4" name="theme">
    <Fieldset>
      <FieldsetLegend class="font-medium text-sm">Choose a theme</FieldsetLegend
      >
      <RadioGroup bind:value={$form.theme} class="flex-row gap-4">
        {#each items as item (item.value)}
          <FieldItem key={item.value}>
            <FieldLabel class="cursor-pointer flex-col">
              <Radio class="peer sr-only absolute" value={item.value} />
              <span
                class="relative block h-[70px] w-[88px] overflow-hidden rounded-lg not-peer-data-[state=checked]:opacity-80 shadow-xs transition-shadow peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-64 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary/48 peer-data-[state=checked]:ring-offset-1 peer-data-[state=checked]:ring-offset-background"
              >
                {@render themePreviews(item.value)}
              </span>
              <span class="not-peer-data-[state=checked]:text-muted-foreground/70">
                {item.label}
              </span>
            </FieldLabel>
          </FieldItem>
        {/each}
      </RadioGroup>
    </Fieldset>
  </Field>
</Form>
