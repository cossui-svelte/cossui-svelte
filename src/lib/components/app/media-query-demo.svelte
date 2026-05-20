<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { Badge } from "$lib/components/ui/badge";

  interface Row {
    label: string;
    description?: string;
    value: boolean;
  }

  interface SectionProps {
    title: string;
    rows: Row[];
  }

  // Reactive media query states
  let sm = $state(false);
  let md = $state(false);
  let lg = $state(false);
  let xl = $state(false);
  let xxl = $state(false);
  let maxSm = $state(false);
  let maxMd = $state(false);
  let maxLg = $state(false);
  let smToMd = $state(false);
  let mdToLg = $state(false);
  let lgToXl = $state(false);
  let pointerCoarse = $state(false);
  let pointerFine = $state(false);
  let darkMode = $state(false);
  let reducedMotion = $state(false);

  $effect(() => {
    if (typeof window === "undefined") return;

    type SetFn = (v: boolean) => void;

    const mqConfig: { q: string; set: SetFn }[] = [
      { q: "(min-width: 640px)", set: (v) => (sm = v) },
      { q: "(min-width: 800px)", set: (v) => (md = v) },
      { q: "(min-width: 1024px)", set: (v) => (lg = v) },
      { q: "(min-width: 1280px)", set: (v) => (xl = v) },
      { q: "(min-width: 1536px)", set: (v) => (xxl = v) },
      { q: "(max-width: 639px)", set: (v) => (maxSm = v) },
      { q: "(max-width: 799px)", set: (v) => (maxMd = v) },
      { q: "(max-width: 1023px)", set: (v) => (maxLg = v) },
      {
        q: "(min-width: 640px) and (max-width: 799px)",
        set: (v) => (smToMd = v),
      },
      {
        q: "(min-width: 800px) and (max-width: 1023px)",
        set: (v) => (mdToLg = v),
      },
      {
        q: "(min-width: 1024px) and (max-width: 1279px)",
        set: (v) => (lgToXl = v),
      },
      { q: "(pointer: coarse)", set: (v) => (pointerCoarse = v) },
      { q: "(pointer: fine)", set: (v) => (pointerFine = v) },
      { q: "(prefers-color-scheme: dark)", set: (v) => (darkMode = v) },
      {
        q: "(prefers-reduced-motion: reduce)",
        set: (v) => (reducedMotion = v),
      },
    ];

    const mqList = mqConfig.map(({ q, set }) => {
      const mq = window.matchMedia(q);
      set(mq.matches);
      const handler = (e: MediaQueryListEvent) => set(e.matches);
      mq.addEventListener("change", handler);
      return { mq, handler };
    });

    return () => {
      mqList.forEach(({ mq, handler }) =>
        mq.removeEventListener("change", handler),
      );
    };
  });
</script>

{#snippet section({ title, rows }: SectionProps)}
  <div>
    <h3 class="mb-2 font-medium text-sm">{title}</h3>
    <ul class="divide-y rounded-xl border">
      {#each rows as row (row.label)}
        <li class="flex items-center justify-between gap-2 px-3 py-2.5">
          <div class="min-w-0">
            <code
              class="relative break-all rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[.8125rem] text-muted-foreground outline-none"
            >
              {row.label}
            </code>
          </div>
          <div class="flex items-center gap-2">
            {#if row.description}
              <span class="ms-2 text-muted-foreground text-xs"
                >{row.description}</span
              >
            {/if}
            <Badge
              class={cn(
                "min-w-11 shrink-0 rounded-full text-xs sm:h-6 sm:min-w-11",
                !row.value && "text-muted-foreground",
              )}
              variant={row.value ? "success" : "secondary"}
            >
              {row.value ? "true" : "false"}
            </Badge>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{/snippet}

<div class="my-8 flex flex-col gap-6">
  {@render section({
    title: "Min-width (breakpoint and above)",
    rows: [
      { description: "≥ 640px", label: `useMediaQuery("sm")`, value: sm },
      { description: "≥ 800px", label: `useMediaQuery("md")`, value: md },
      { description: "≥ 1024px", label: `useMediaQuery("lg")`, value: lg },
      { description: "≥ 1280px", label: `useMediaQuery("xl")`, value: xl },
      { description: "≥ 1536px", label: `useMediaQuery("2xl")`, value: xxl },
    ],
  })}
  {@render section({
    title: "Max-width (below breakpoint)",
    rows: [
      {
        description: "< 640px",
        label: `useMediaQuery("max-sm")`,
        value: maxSm,
      },
      {
        description: "< 800px",
        label: `useMediaQuery("max-md")`,
        value: maxMd,
      },
      {
        description: "< 1024px",
        label: `useMediaQuery("max-lg")`,
        value: maxLg,
      },
    ],
  })}
  {@render section({
    title: "Ranges",
    rows: [
      {
        description: "640 - 799px",
        label: `useMediaQuery("sm:max-md")`,
        value: smToMd,
      },
      {
        description: "800 - 1023px",
        label: `useMediaQuery("md:max-lg")`,
        value: mdToLg,
      },
      {
        description: "1024 - 1279px",
        label: `useMediaQuery("lg:max-xl")`,
        value: lgToXl,
      },
    ],
  })}
  {@render section({
    title: "Device & preferences",
    rows: [
      {
        description: "touch",
        label: `useMediaQuery({ pointer: "coarse" })`,
        value: pointerCoarse,
      },
      {
        description: "mouse",
        label: `useMediaQuery({ pointer: "fine" })`,
        value: pointerFine,
      },
      {
        label: `useMediaQuery("(prefers-color-scheme: dark)")`,
        value: darkMode,
      },
      {
        label: `useMediaQuery("(prefers-reduced-motion: reduce)")`,
        value: reducedMotion,
      },
    ],
  })}
</div>
