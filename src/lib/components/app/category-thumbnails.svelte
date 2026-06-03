<script lang="ts">
  import { cn } from "$lib/utils";
  import CircleAlert from "@lucide/svelte/icons/circle-alert";
  import Calendar from "@lucide/svelte/icons/calendar";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import ChevronLeft from "@lucide/svelte/icons/chevron-left";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import Ellipsis from "@lucide/svelte/icons/ellipsis";
  import Info from "@lucide/svelte/icons/info";
  import Minus from "@lucide/svelte/icons/minus";
  import Plus from "@lucide/svelte/icons/plus";
  import Search from "@lucide/svelte/icons/search";
  import TextCursor from "@lucide/svelte/icons/text-cursor";
  import UserRound from "@lucide/svelte/icons/user-round";
  import X from "@lucide/svelte/icons/x";

  interface Props {
    slug: string;
  }

  let { slug }: Props = $props();

  // ── Helper class generators ─────────────────────────────────────────────────

  function cardCls(cls?: string, withGradient = true) {
    return cn(
      "relative flex w-full max-w-72 flex-col rounded-2xl border not-dark:bg-clip-padding text-card-foreground shadow-md/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_-1px_--theme(--color-white/6%),0_1px_--theme(--color-black/6%)]",
      withGradient
        ? "bg-linear-to-b from-[color-mix(in_srgb,var(--card)_96%,var(--color-white))] to-[color-mix(in_srgb,var(--card)_99%,var(--color-black))] dark:to-[color-mix(in_srgb,var(--card)_98%,var(--color-white))]"
        : "bg-card/99 dark:bg-card",
      cls,
    );
  }

  function cpCls(cls?: string) {
    return cn("flex-1 p-6", cls);
  }
</script>

<!-- ── Primitive snippets ──────────────────────────────────────────────────── -->

{#snippet iconSnip(IconComp: any, cls?: string)}
  <svelte:component
    this={IconComp}
    class={cn("size-4 text-muted-foreground/88", cls)}
  />
{/snippet}

{#snippet textSnip(cls?: string, variant: "main" | "secondary" = "main")}
  <div
    class={cn(
      "h-1.5 rounded-full",
      variant === "main" ? "bg-muted-foreground/40" : "bg-muted-foreground/20",
      cls,
    )}
  ></div>
{/snippet}

{#snippet btnSnip(variant: "primary" | "secondary" = "secondary", cls?: string)}
  <div
    class={cn(
      variant === "primary" ? "h-4" : "h-1.5",
      "w-7 rounded-sm",
      variant === "primary"
        ? "bg-linear-to-b from-(--btn-from) to-(--btn-to)"
        : "bg-muted-foreground/20",
      cls,
    )}
  ></div>
{/snippet}

{#snippet checkboxItem(checked = false, cls?: string)}
  <div class={cn("flex items-center gap-2", cls)}>
    <div
      class={cn(
        "size-4 shrink-0 rounded",
        checked
          ? "bg-linear-to-b from-(--btn-from) to-(--btn-to)"
          : "bg-muted-foreground/20",
      )}
    ></div>
    {@render textSnip("w-full", "secondary")}
  </div>
{/snippet}

{#snippet radioItem(checked = false, cls?: string)}
  <div class={cn("flex items-center gap-2", cls)}>
    <div
      class={cn(
        "size-4 shrink-0 rounded-full",
        checked
          ? "bg-linear-to-b from-(--btn-from) to-(--btn-to)"
          : "bg-muted-foreground/20",
      )}
    ></div>
    {@render textSnip("w-full", "secondary")}
  </div>
{/snippet}

{#snippet formField(labelWidth = "w-16", showError = false)}
  <div class="flex flex-col gap-2">
    {@render textSnip(labelWidth)}
    <div class={cardCls("[--radius-2xl:10px]", false)}>
      <div class={cpCls("py-3.5")}></div>
    </div>
    {#if showError}
      {@render textSnip("w-[80%]", "secondary")}
    {/if}
  </div>
{/snippet}

{#snippet tableRow(showCheckbox = true)}
  <div class="flex items-center gap-2 p-3">
    {#if showCheckbox}
      {@render textSnip("size-2.5 rounded-xs")}
    {/if}
    {@render textSnip("flex-1")}
    {@render textSnip("flex-1", "secondary")}
    {@render textSnip("flex-1", "secondary")}
    {@render textSnip("flex-1", "secondary")}
    {@render textSnip("flex-1", "secondary")}
  </div>
{/snippet}

{#snippet commandItem()}
  <div class="flex items-center justify-between gap-2">
    {@render textSnip("w-[65%]", "secondary")}
    {@render textSnip("w-4", "secondary")}
  </div>
{/snippet}

<!-- ── Thumbnail gallery ───────────────────────────────────────────────────── -->

{#if slug === "accordion"}
  <div class={cardCls("max-w-50")}>
    <div class={cpCls("divide-y divide-border p-0")}>
      <div class="p-3">
        <div class="flex items-center gap-2">
          {@render iconSnip(ChevronDown)}
          {@render textSnip("w-[60%]")}
        </div>
      </div>
      <div class="p-3">
        <div class="flex items-center gap-2">
          {@render iconSnip(ChevronDown, "rotate-180")}
          <div class="flex flex-1 flex-col gap-2">
            {@render textSnip("w-[50%]")}
            {@render textSnip("w-[90%]", "secondary")}
          </div>
        </div>
      </div>
      <div class="p-3">
        <div class="flex items-center gap-2">
          {@render iconSnip(ChevronDown)}
          {@render textSnip("w-[60%]")}
        </div>
      </div>
    </div>
  </div>
{:else if slug === "alert"}
  <div class={cardCls()}>
    <div class={cpCls("flex items-center gap-2 p-3")}>
      {@render iconSnip(CircleAlert)}
      {@render textSnip("w-[70%]", "secondary")}
    </div>
  </div>
{:else if slug === "alert-dialog"}
  <div class={cardCls("max-w-50")}>
    <div class={cpCls("flex flex-col gap-5 p-4")}>
      <div class="flex flex-col gap-2">
        {@render textSnip("w-[50%]")}
        {@render textSnip("w-[90%]", "secondary")}
      </div>
      <div class="flex items-center justify-end gap-2">
        {@render btnSnip("secondary")}
        {@render btnSnip("primary")}
      </div>
    </div>
  </div>
{:else if slug === "autocomplete"}
  <div class="flex max-w-50 flex-1 flex-col gap-2">
    <div class={cardCls("[--radius-2xl:12px]", false)}>
      <div class={cpCls("flex items-center gap-2 px-4 py-2")}>
        {@render textSnip("w-[40%]")}
        {@render iconSnip(TextCursor)}
      </div>
    </div>
    <div class={cardCls("[--radius-2xl:10px]")}>
      <div class={cpCls("flex flex-col gap-4 p-4")}>
        {@render textSnip(undefined, "secondary")}
        {@render textSnip(undefined, "secondary")}
        {@render textSnip(undefined, "secondary")}
      </div>
    </div>
  </div>
{:else if slug === "avatar"}
  <div class={cardCls("size-12 [--radius-2xl:9999px]")}>
    <div class={cpCls("flex items-center justify-center p-0")}>
      <div class="flex size-full items-center justify-center rounded-full">
        {@render iconSnip(UserRound)}
      </div>
    </div>
  </div>
{:else if slug === "badge"}
  <div class={cardCls("max-w-24 [--radius-2xl:9999px]")}>
    <div class={cpCls("flex items-center gap-2 px-2.5 py-2")}>
      <div class="size-2 rounded-full bg-muted-foreground/88"></div>
      {@render textSnip("flex-1")}
    </div>
  </div>
{:else if slug === "breadcrumb"}
  <div class={cardCls()}>
    <div class={cpCls("flex items-center gap-1 p-3")}>
      {@render textSnip("flex-1")}
      {@render iconSnip(ChevronRight)}
      {@render textSnip("flex-1", "secondary")}
      {@render iconSnip(ChevronRight)}
      {@render textSnip("flex-1", "secondary")}
    </div>
  </div>
{:else if slug === "button"}
  <div
    class={cardCls(
      "max-w-24 border-none bg-linear-to-b from-(--btn-from) to-(--btn-to) [--radius-2xl:14px]",
      false,
    )}
  >
    <div class={cpCls("px-6 py-4")}>
      {@render textSnip("bg-primary-foreground/40")}
    </div>
  </div>
{:else if slug === "calendar"}
  <div class={cardCls("max-w-36 [--radius-2xl:14px]")}>
    <div class={cpCls("flex flex-col gap-4 p-4")}>
      <div class="flex items-center gap-2">
        {@render iconSnip(ChevronLeft)}
        {@render textSnip("w-[60%]", "secondary")}
        {@render iconSnip(ChevronRight)}
      </div>
      <div class="flex items-center gap-2">
        {@render textSnip("flex-1", "secondary")}
        {@render textSnip("flex-1", "secondary")}
        {@render textSnip("flex-1")}
        {@render textSnip("flex-1 bg-transparent")}
        {@render textSnip("flex-1")}
      </div>
      <div class="flex items-center gap-2">
        {@render textSnip("flex-1")}
        {@render textSnip("flex-1 bg-transparent")}
        {@render textSnip("flex-1")}
        {@render textSnip("flex-1")}
        {@render textSnip("flex-1")}
      </div>
      <div class="flex items-center gap-2">
        {@render textSnip("flex-1 bg-transparent")}
        {@render textSnip("flex-1")}
        <div class="h-1.5 flex-1 rounded-full bg-primary"></div>
        {@render textSnip("flex-1")}
        {@render textSnip("flex-1 bg-transparent")}
      </div>
      <div class="flex items-center gap-2">
        {@render textSnip("flex-1")}
        {@render textSnip("flex-1")}
        {@render textSnip("flex-1 bg-transparent")}
        {@render textSnip("flex-1", "secondary")}
        {@render textSnip("flex-1", "secondary")}
      </div>
    </div>
  </div>
{:else if slug === "card"}
  <div class={cardCls("max-w-36 [--radius-2xl:14px]")}>
    <div class={cpCls("flex flex-col gap-4 p-4")}>
      <div class="flex flex-col gap-2">
        {@render textSnip("w-[60%]")}
        {@render textSnip("w-[90%]", "secondary")}
      </div>
      <div class="flex flex-col gap-2">
        <div class="h-4 rounded-sm bg-muted-foreground/8"></div>
        <div class="h-4 rounded-sm bg-muted-foreground/8"></div>
        {@render btnSnip("primary", "w-full rounded-sm")}
      </div>
    </div>
  </div>
{:else if slug === "checkbox"}
  <div class="flex max-w-28 flex-1 flex-col gap-3">
    {@render checkboxItem()}
    {@render checkboxItem(true)}
  </div>
{:else if slug === "checkbox-group"}
  <div class="flex max-w-28 flex-1 flex-col gap-3">
    {@render checkboxItem(true)}
    {@render checkboxItem(false, "ps-4")}
    {@render checkboxItem(true, "ps-4")}
    {@render checkboxItem()}
  </div>
{:else if slug === "collapsible"}
  <div class={cardCls()}>
    <div class={cpCls("divide-y divide-border p-0")}>
      <div class="flex items-center justify-between px-4 py-3">
        {@render textSnip("w-[60%]")}
        {@render iconSnip(ChevronDown)}
      </div>
      <div class="flex flex-col gap-2 p-4">
        {@render textSnip("w-[80%]", "secondary")}
        {@render textSnip("w-[70%]", "secondary")}
      </div>
    </div>
  </div>
{:else if slug === "combobox"}
  <div class={cardCls("[--radius-2xl:14px]", false)}>
    <div
      class={cpCls(
        "flex items-center gap-2 px-3 py-[calc(--spacing(2.5)-1px)]",
      )}
    >
      <div
        class="flex h-5 items-center gap-1 rounded-sm bg-muted-foreground/8 py-0.5 ps-2 pe-1"
      >
        {@render textSnip("w-6")}
        {@render iconSnip(X)}
      </div>
      <div
        class="flex h-5 items-center gap-1 rounded-sm bg-muted-foreground/8 py-0.5 ps-2 pe-1"
      >
        {@render textSnip("w-6")}
        {@render iconSnip(X)}
      </div>
    </div>
  </div>
{:else if slug === "command"}
  <div class={cardCls("max-w-50")}>
    <div class={cpCls("divide-y divide-border p-0")}>
      <div class="flex items-center gap-2 px-4 py-3">
        {@render iconSnip(Search)}
        {@render textSnip("w-[40%]")}
      </div>
      <div class="flex flex-col gap-4 p-4">
        {@render commandItem()}
        {@render commandItem()}
        {@render commandItem()}
      </div>
    </div>
  </div>
{:else if slug === "date-picker"}
  <div class={cardCls("[--radius-2xl:14px]", false)}>
    <div class={cpCls("flex items-center gap-2 p-3")}>
      {@render iconSnip(Calendar)}
      {@render textSnip("w-[60%]")}
    </div>
  </div>
{:else if slug === "dialog"}
  <div class={cardCls("max-w-36 [--radius-2xl:14px]")}>
    <div class={cpCls("flex flex-col gap-4 p-4")}>
      <div class="flex flex-col gap-2">
        {@render textSnip("w-[60%]")}
      </div>
      <div class="flex flex-col gap-2">
        <div class="h-4 rounded-sm bg-muted-foreground/8"></div>
        <div class="h-4 rounded-sm bg-muted-foreground/8"></div>
      </div>
      <div class="flex items-center justify-end gap-2">
        {@render btnSnip("secondary")}
        {@render btnSnip("primary")}
      </div>
    </div>
  </div>
{:else if slug === "drawer"}
  <div class="flex h-full w-full flex-1 flex-col justify-end gap-2">
    <div class="flex-1 rounded-xl border border-input border-dashed"></div>
    <div class={cardCls("max-w-none shrink-0 [--radius-2xl:14px]")}>
      <div class={cpCls("pt-1 pb-12")}>
        <div class="flex justify-center py-2">
          <div class="h-1 w-12 rounded-full bg-muted-foreground/30"></div>
        </div>
      </div>
    </div>
  </div>
{:else if slug === "empty"}
  <div
    class={cardCls(
      "border-input border-dashed bg-none shadow-none before:hidden",
    )}
  >
    <div class={cpCls("flex flex-col items-center gap-2")}>
      <div class="size-8 rounded-full bg-muted-foreground/20"></div>
      {@render textSnip("w-[60%]")}
      {@render textSnip("w-[80%]", "secondary")}
    </div>
  </div>
{:else if slug === "field"}
  <div class="flex max-w-50 flex-1 flex-col gap-3">
    {@render formField("w-16", true)}
  </div>
{:else if slug === "fieldset"}
  <div class="flex max-w-50 flex-1 flex-col gap-4">
    {@render formField()}
    {@render formField()}
  </div>
{:else if slug === "form"}
  <div class="flex max-w-50 flex-1 flex-col gap-4">
    {@render formField()}
    <div
      class={cardCls(
        "border-none bg-linear-to-b from-(--btn-from) to-(--btn-to) [--radius-2xl:10px]",
        false,
      )}
    >
      <div class={cpCls("py-3.5")}></div>
    </div>
  </div>
{:else if slug === "frame"}
  <div class="flex-1 rounded-[calc(var(--radius-2xl)+2px)] bg-muted/72 p-1">
    <div class="flex flex-col gap-2 p-4">
      {@render textSnip("w-[70%]")}
    </div>
    <div class={cardCls("max-w-none")}>
      <div class={cpCls("p-5")}>
        <div class="flex flex-col gap-2">
          {@render textSnip("w-[70%]")}
          {@render textSnip("w-[90%]", "secondary")}
        </div>
      </div>
    </div>
  </div>
{:else if slug === "group"}
  <div class={cardCls("max-w-48 flex-row divide-x [--radius-2xl:14px]")}>
    <div class={cpCls("px-6 py-4")}>
      {@render textSnip()}
    </div>
    <div class={cpCls("px-6 py-4")}>
      {@render textSnip()}
    </div>
  </div>
{:else if slug === "input"}
  <div class={cardCls("[--radius-2xl:14px]", false)}>
    <div class={cpCls("px-6 py-4")}>
      {@render textSnip("w-[60%]")}
    </div>
  </div>
{:else if slug === "otp-field"}
  <div class="flex max-w-50 flex-1 items-center gap-2">
    <div class={cardCls("size-10 [--radius-2xl:12px]", false)}>
      <div class={cpCls("flex items-center justify-center p-0")}>
        {@render textSnip("size-1.5")}
      </div>
    </div>
    <div class={cardCls("size-10 [--radius-2xl:12px]", false)}>
      <div class={cpCls("flex items-center justify-center p-0")}>
        {@render textSnip("size-1.5")}
      </div>
    </div>
    <div class={cardCls("size-10 [--radius-2xl:12px]", false)}>
      <div class={cpCls("flex items-center justify-center p-0")}>
        {@render textSnip("size-1.5")}
      </div>
    </div>
    <div class={cardCls("size-10 [--radius-2xl:12px]", false)}>
      <div class={cpCls("flex items-center justify-center p-0")}>
        {@render iconSnip(TextCursor)}
      </div>
    </div>
  </div>
{:else if slug === "input-group"}
  <div class={cardCls("[--radius-2xl:14px]", false)}>
    <div class={cpCls("flex gap-2 p-0")}>
      <div class="flex flex-1 items-center gap-2 py-2.5 ps-4">
        {@render iconSnip(Search)}
        {@render textSnip("w-[60%]")}
      </div>
      <div class="flex items-center py-2.5 pe-4">
        <div class="size-4 shrink-0 rounded bg-muted-foreground/20"></div>
      </div>
    </div>
  </div>
{:else if slug === "kbd"}
  <div class="flex items-center justify-center gap-2">
    <div class={cardCls("size-10 [--radius-2xl:10px]")}>
      <div
        class={cpCls(
          "flex items-center justify-center p-0 text-muted-foreground/88 leading-none",
        )}
      >
        ⌘
      </div>
    </div>
    <div class={cardCls("size-10 [--radius-2xl:10px]")}>
      <div
        class={cpCls(
          "flex items-center justify-center p-0 text-muted-foreground/88 leading-none",
        )}
      >
        K
      </div>
    </div>
  </div>
{:else if slug === "label"}
  <div class="flex max-w-50 flex-1 flex-col gap-3">
    <div class="h-1.5 w-16 rounded-full bg-primary"></div>
    <div class={cardCls("[--radius-2xl:10px]", false)}>
      <div class={cpCls("py-3.5")}></div>
    </div>
  </div>
{:else if slug === "menu"}
  <div class="flex max-w-50 flex-1 flex-col items-end gap-2">
    <div class={cardCls("w-fit [--radius-2xl:12px]")}>
      <div class={cpCls("flex items-center gap-2 p-2")}>
        {@render iconSnip(Ellipsis)}
      </div>
    </div>
    <div class={cardCls("[--radius-2xl:10px]")}>
      <div class={cpCls("flex flex-col gap-4 p-4")}>
        <div class="me-6">
          {@render textSnip("w-full", "secondary")}
        </div>
        <div class="flex items-center gap-4">
          <div class="flex-1">
            {@render textSnip(undefined, "secondary")}
          </div>
          {@render iconSnip(ChevronRight, "-m-1")}
        </div>
        <div class="me-6">
          {@render textSnip("w-full", "secondary")}
        </div>
      </div>
    </div>
  </div>
{:else if slug === "meter"}
  <div class="flex max-w-50 flex-1 flex-col gap-2">
    <div class="flex items-center justify-between">
      {@render textSnip("w-[50%]")}
      {@render textSnip("w-8")}
    </div>
    <div class="h-2 w-full rounded-full bg-muted-foreground/20">
      <div
        class="h-2 w-[65%] rounded-s-full bg-linear-to-b from-(--btn-from) to-(--btn-to)"
      ></div>
    </div>
  </div>
{:else if slug === "number-field"}
  <div class={cardCls("[--radius-2xl:14px]")}>
    <div class={cpCls("flex items-center gap-2 px-4 py-2.5")}>
      {@render iconSnip(Minus, "shrink-0")}
      <div class="flex flex-1 justify-center">
        {@render textSnip("w-12")}
      </div>
      {@render iconSnip(Plus, "shrink-0")}
    </div>
  </div>
{:else if slug === "pagination"}
  <div class="flex flex-1 items-center gap-4">
    <div class={cardCls("w-fit [--radius-2xl:12px]")}>
      <div class={cpCls("flex items-center gap-2 p-2")}>
        {@render iconSnip(ChevronLeft)}
      </div>
    </div>
    <div class="flex flex-1 gap-2">
      {@render textSnip("flex-1", "secondary")}
      {@render textSnip("flex-1", "secondary")}
      {@render textSnip("flex-1", "secondary")}
    </div>
    <div class={cardCls("w-fit [--radius-2xl:12px]")}>
      <div class={cpCls("flex items-center gap-2 p-2")}>
        {@render iconSnip(ChevronRight)}
      </div>
    </div>
  </div>
{:else if slug === "popover"}
  <div class="flex max-w-50 flex-1 flex-col items-center gap-2">
    <div class={cardCls("w-fit [--radius-2xl:12px]")}>
      <div class={cpCls("flex items-center gap-2 px-4 py-3")}>
        {@render textSnip("w-12")}
      </div>
    </div>
    <div class={cardCls("[--radius-2xl:10px]")}>
      <div class={cpCls("flex flex-col gap-3 p-4")}>
        {@render textSnip("w-[70%]")}
        <div class="flex flex-col gap-1.5">
          {@render textSnip("w-[80%]", "secondary")}
          {@render textSnip("w-[60%]", "secondary")}
        </div>
      </div>
    </div>
  </div>
{:else if slug === "preview-card"}
  <div class={cardCls("max-w-50")}>
    <div class={cpCls("flex items-center gap-3 p-4")}>
      <div class="size-9 shrink-0 rounded-full bg-muted-foreground/20"></div>
      <div class="flex flex-1 flex-col gap-2">
        {@render textSnip("w-[70%]")}
        {@render textSnip(undefined, "secondary")}
        {@render textSnip("w-[90%]", "secondary")}
      </div>
    </div>
  </div>
{:else if slug === "progress"}
  <div class="flex max-w-50 flex-1 flex-col gap-2">
    <div class="h-2 w-full rounded-full bg-muted-foreground/20">
      <div
        class="h-2 w-[45%] rounded-s-full bg-linear-to-b from-(--btn-from) to-(--btn-to)"
      ></div>
    </div>
  </div>
{:else if slug === "radio-group"}
  <div class="flex max-w-28 flex-1 flex-col gap-3">
    {@render radioItem()}
    {@render radioItem(true)}
  </div>
{:else if slug === "scroll-area"}
  <div class={cardCls("max-w-36 [--radius-2xl:14px]")}>
    <div class={cpCls("relative p-0")}>
      <div class="flex flex-col gap-2 p-3">
        {@render textSnip("w-[80%]", "secondary")}
        {@render textSnip("w-[90%]", "secondary")}
        {@render textSnip("w-[70%]", "secondary")}
        {@render textSnip("w-[85%]", "secondary")}
        {@render textSnip("w-[90%]", "secondary")}
        {@render textSnip("w-[80%]", "secondary")}
      </div>
      <div
        class="absolute top-2 right-1 h-8 w-1 rounded-full bg-muted-foreground/40"
      ></div>
    </div>
  </div>
{:else if slug === "select"}
  <div class={cardCls("[--radius-2xl:14px]", false)}>
    <div class={cpCls("flex gap-2 p-0")}>
      <div
        class="flex flex-1 items-center justify-between gap-2 py-2.5 ps-4 pe-2.5"
      >
        {@render textSnip("w-[60%]")}
        {@render iconSnip(ChevronDown)}
      </div>
    </div>
  </div>
{:else if slug === "separator"}
  <div class="max-w-50 flex-1 divide-y">
    <div class="flex flex-col gap-2 py-3">
      {@render textSnip("w-[60%]")}
      {@render textSnip(undefined, "secondary")}
    </div>
    <div class="flex items-center gap-2 divide-x py-3">
      <div class="-mx-2 flex-1 px-2 py-1">
        {@render textSnip(undefined, "secondary")}
      </div>
      <div class="flex-1 px-2 py-1">
        {@render textSnip(undefined, "secondary")}
      </div>
      <div class="-mx-2 flex-1 px-2 py-1">
        {@render textSnip(undefined, "secondary")}
      </div>
      <div class="flex-1 px-2 py-1">
        {@render textSnip(undefined, "secondary")}
      </div>
    </div>
  </div>
{:else if slug === "sheet"}
  <div class="flex h-full flex-1 gap-2">
    <div class="flex-1 rounded-xl border border-input border-dashed"></div>
    <div class={cardCls("h-full max-w-1/3 [--radius-2xl:14px]")}>
      <div class={cpCls("flex flex-col gap-4 p-3")}>
        <div class="flex flex-1 flex-col gap-2">
          {@render textSnip("w-[60%]")}
          {@render textSnip(undefined, "secondary")}
        </div>
        <div class="flex items-center justify-end gap-2">
          {@render btnSnip("primary")}
        </div>
      </div>
    </div>
  </div>
{:else if slug === "skeleton"}
  <div
    class="mask-[linear-gradient(100deg,black_0%,rgba(0,0,0,0.2)_20%,rgba(0,0,0,0.2)_80%,rgba(0,0,0,0.6)_100%)] flex max-w-50 flex-1 items-center gap-3"
  >
    <div class="size-8 rounded-full bg-muted-foreground/20"></div>
    <div class="flex flex-1 flex-col gap-2">
      {@render textSnip("w-full", "secondary")}
      {@render textSnip("w-full", "secondary")}
    </div>
  </div>
{:else if slug === "slider"}
  <div class="flex w-full max-w-50 items-center gap-1">
    <div
      class="h-1.5 w-[35%] rounded-full bg-linear-to-b from-(--btn-from) to-(--btn-to)"
    ></div>
    <div
      class="size-4 rounded-full bg-linear-to-b from-(--btn-from) to-(--btn-to)"
    ></div>
    {@render textSnip("flex-1", "secondary")}
  </div>
{:else if slug === "spinner"}
  <div
    class="size-8 rotate-45 rounded-full border-3 border-muted-foreground/20 border-t-primary"
  ></div>
{:else if slug === "switch"}
  <div class="h-6 w-10 rounded-full bg-muted-foreground/20 p-0.5">
    <div
      class="size-5 rounded-full bg-linear-to-b from-card to-card/90 shadow-xs/5 dark:from-background/90 dark:to-background"
    ></div>
  </div>
{:else if slug === "table"}
  <div class={cardCls()}>
    <div class={cpCls("p-0")}>
      <div class="divide-y divide-border">
        {@render tableRow()}
        {@render tableRow()}
        {@render tableRow()}
      </div>
    </div>
  </div>
{:else if slug === "tabs"}
  <div class="flex max-w-50 flex-col gap-4">
    <div class="flex rounded-lg bg-muted-foreground/12 p-0.5">
      <div
        class="rounded-[calc(var(--radius-lg)-1px)] bg-linear-to-b from-card to-card/90 p-3 shadow-xs/5 dark:from-background/90 dark:to-background"
      >
        <div class="h-1.5 w-6 rounded-full bg-primary"></div>
      </div>
      <div class="rounded-[calc(var(--radius-lg)-1px)] p-3">
        {@render textSnip("w-6", "secondary")}
      </div>
      <div class="rounded-[calc(var(--radius-lg)-1px)] p-3">
        {@render textSnip("w-6", "secondary")}
      </div>
    </div>
    <div class="flex flex-col gap-2">
      {@render textSnip("w-[70%]")}
      {@render textSnip(undefined, "secondary")}
    </div>
  </div>
{:else if slug === "textarea"}
  <div class={cardCls("[--radius-2xl:14px]", false)}>
    <div class={cpCls("flex flex-col gap-2 px-6 py-4")}>
      {@render textSnip("w-[60%]")}
      {@render textSnip("opacity-0")}
      {@render textSnip("opacity-0")}
    </div>
  </div>
{:else if slug === "toast"}
  <div class="relative flex flex-1 justify-center">
    <div class={cardCls("-top-6 absolute scale-80")}>
      <div class={cpCls("flex items-center gap-2 p-3")}></div>
    </div>
    <div class={cardCls("-top-3 absolute scale-90")}>
      <div class={cpCls("flex items-center gap-2 p-3")}></div>
    </div>
    <div class={cardCls()}>
      <div class={cpCls("flex items-start gap-2 p-3")}>
        {@render iconSnip(CircleAlert)}
        <div class="flex flex-1 flex-col gap-2">
          {@render textSnip("w-[40%]")}
          {@render textSnip("w-[70%]", "secondary")}
        </div>
      </div>
    </div>
  </div>
{:else if slug === "toggle"}
  <div class="flex flex-1 flex-col items-center justify-center gap-2">
    <div class={cardCls("max-w-12 [--radius-2xl:14px]")}>
      <div class={cpCls("rounded-[inherit] p-4")}>
        {@render textSnip()}
      </div>
    </div>
    <div
      class={cardCls("max-w-12 shadow-none [--radius-2xl:14px] before:hidden")}
    >
      <div class={cpCls("rounded-[inherit] bg-muted-foreground/8 p-4")}>
        <div class="h-1.5 rounded-full bg-primary"></div>
      </div>
    </div>
  </div>
{:else if slug === "toggle-group"}
  <div class={cardCls("w-auto flex-row divide-x [--radius-2xl:14px]")}>
    <div class={cpCls("bg-clip-padding p-4")}>
      {@render textSnip("w-4")}
    </div>
    <div class={cpCls("bg-muted-foreground/8 bg-clip-padding p-4")}>
      <div class="h-1.5 w-4 rounded-full bg-foreground"></div>
    </div>
    <div class={cpCls("bg-clip-padding p-4")}>
      {@render textSnip("w-4")}
    </div>
  </div>
{:else if slug === "toolbar"}
  <div class="flex items-center gap-1 rounded-xl border p-1">
    <div class={cardCls("w-fit [--radius-2xl:12px]")}>
      <div class={cpCls("p-3.5")}>
        {@render textSnip("w-4")}
      </div>
    </div>
    <div class={cardCls("w-fit [--radius-2xl:12px]")}>
      <div class={cpCls("p-3.5")}>
        {@render textSnip("w-4")}
      </div>
    </div>
    <div class={cardCls("w-fit [--radius-2xl:12px]")}>
      <div class={cpCls("p-3.5")}>
        {@render textSnip("w-4")}
      </div>
    </div>
  </div>
{:else if slug === "tooltip"}
  <div class="flex max-w-32 flex-1 flex-col items-center gap-2">
    <div class={cardCls("[--radius-2xl:10px]")}>
      <div class={cpCls("p-4")}>
        {@render textSnip()}
      </div>
    </div>
    {@render iconSnip(Info)}
  </div>
{/if}
