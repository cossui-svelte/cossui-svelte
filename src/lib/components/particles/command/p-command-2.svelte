<script lang="ts">
  import ArrowDown from "@lucide/svelte/icons/arrow-down";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import ArrowUp from "@lucide/svelte/icons/arrow-up";
  import CircleHelp from "@lucide/svelte/icons/circle-help";
  import CornerDownLeft from "@lucide/svelte/icons/corner-down-left";
  import Search from "@lucide/svelte/icons/search";
  import Sparkles from "@lucide/svelte/icons/sparkles";
  import { Button } from "$lib/components/ui/button";
  import {
    Command,
    CommandCollection,
    CommandEmpty,
    CommandDialog,
    CommandDialogPopup,
    CommandFooter,
    CommandGroup,
    CommandGroupLabel,
    CommandInput,
    CommandItem,
    CommandList,
    CommandPanel,
    CommandSeparator,
    CommandShortcut,
  } from "$lib/components/ui/command";
  import { EmptyMedia } from "$lib/components/ui/empty";
  import { Input } from "$lib/components/ui/input";
  import { Kbd, KbdGroup } from "$lib/components/ui/kbd";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { Spinner } from "$lib/components/ui/spinner";

  interface Item {
    value: string;
    label: string;
    shortcut?: string;
    keywords?: string[];
  }

  interface Group {
    value: string;
    items: Item[];
  }

  const commandGroups: Group[] = [
    {
      items: [
        { keywords: ["dash"], label: "Dashboard", shortcut: "d", value: "dashboard" },
        { keywords: ["proj"], label: "Projects", shortcut: "p", value: "projects" },
        { keywords: ["team"], label: "Team", shortcut: "t", value: "team" },
      ],
      value: "Pages",
    },
    {
      items: [
        { keywords: ["prof"], label: "Profile", shortcut: "p s", value: "profile" },
        { keywords: ["acc"], label: "Account", shortcut: "a s", value: "account" },
        { keywords: ["pref"], label: "Preferences", shortcut: "p r", value: "preferences" },
      ],
      value: "Settings",
    },
    {
      items: [
        { keywords: ["docs"], label: "Documentation", shortcut: "d o", value: "docs" },
        { keywords: ["sup"], label: "Support", shortcut: "s u", value: "support" },
        { keywords: ["feed"], label: "Feedback", shortcut: "f b", value: "feedback" },
      ],
      value: "Help",
    },
  ];

  const MOCK_AI_RESPONSE = `To create a new project, navigate to the Projects page and click the "New Project" button in the top right corner. You'll be prompted to enter a project name and description.

Once created, you can invite team members by clicking the "Share" button and entering their email addresses. Team members will receive an invitation link via email or you can add them manually by clicking the "Add Team Member" button in the project settings.

You can customize project settings at any time by clicking the settings icon in the project header. For more information, see the Project Settings documentation.`;

  const MOCK_REFERENCE_LINKS = [
    { title: "Creating Projects", url: "/docs/projects/create" },
    { title: "Team Collaboration", url: "/docs/team/collaborate" },
    { title: "Project Settings", url: "/docs/projects/settings" },
  ];

  function markdownToSafeHTML(markdown: string): string {
    return markdown
      .split("\n\n")
      .map((para) => `<p>${para}</p>`)
      .join("");
  }

  function contains(a: string, b: string): boolean {
    return a.toLowerCase().includes(b.toLowerCase());
  }

  interface AIState {
    mode: boolean;
    query: string;
    submittedQuery: string;
    response: string;
    referenceLinks: Array<{ title: string; url: string }>;
    isGenerating: boolean;
    error: string | null;
  }

  const initialAIState: AIState = {
    error: null,
    isGenerating: false,
    mode: false,
    query: "",
    referenceLinks: [],
    response: "",
    submittedQuery: "",
  };

  let open = $state(false);
  let aiState = $state<AIState>({ ...initialAIState });
  let searchQuery = $state("");
  let aiInputEl = $state<HTMLInputElement | null>(null);
  let searchInputEl = $state<HTMLInputElement | null>(null);
  let abortController = $state<AbortController | null>(null);
  let commandResetKey = $state(0);

  function resetAIState() {
    abortController?.abort();
    aiState = { ...initialAIState };
  }

  function handleItemClick() {
    open = false;
  }

  function handleBackToSearch() {
    resetAIState();
    searchQuery = "";
    commandResetKey += 1;
    searchInputEl?.focus();
  }

  async function handleGenerateAI(queryOverride?: string) {
    const query = queryOverride || aiState.query;
    if (!query.trim()) return;

    abortController?.abort();
    const controller = new AbortController();
    abortController = controller;

    aiState = {
      ...aiState,
      error: null,
      isGenerating: true,
      query: "",
      referenceLinks: [],
      response: "",
      submittedQuery: query,
    };

    try {
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(resolve, 1500);
        controller.signal.addEventListener("abort", () => {
          clearTimeout(timeout);
          reject(new Error("aborted"));
        });
      });

      if (controller.signal.aborted) return;

      aiState = {
        ...aiState,
        isGenerating: false,
        referenceLinks: MOCK_REFERENCE_LINKS,
        response: MOCK_AI_RESPONSE,
      };
    } catch (error) {
      if (error instanceof Error && error.message === "aborted") return;
      if (controller.signal.aborted) return;
      aiState = { ...aiState, error: "Failed to generate response. Please try again.", isGenerating: false };
    }
  }

  function handleAskAI() {
    const currentQuery = searchQuery;
    searchQuery = "";
    if (currentQuery.trim()) {
      aiState = { ...aiState, mode: true };
      handleGenerateAI(currentQuery);
    } else {
      aiState = { ...aiState, mode: true, query: "" };
      aiInputEl?.focus();
    }
  }

  const hasResults = $derived(
    !searchQuery.trim() ||
    commandGroups.some((group) =>
      group.items.some(
        (item) => contains(item.label, searchQuery) || contains(item.value, searchQuery),
      ),
    ),
  );

  function handleOpenChange(newOpen: boolean) {
    open = newOpen;
    if (!newOpen) {
      searchQuery = "";
      resetAIState();
    }
  }

  $effect(() => {
    if (!open || !aiState.mode) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        handleBackToSearch();
      }
    }
    document.addEventListener("keydown", handleEscape, true);
    return () => document.removeEventListener("keydown", handleEscape, true);
  });

  $effect(() => {
    if (aiState.mode && !aiState.isGenerating) {
      aiInputEl?.focus();
    }
  });
</script>

<Button onclick={() => { open = true; }} variant="outline">Cmdk with AI</Button>

<CommandDialog {open} onOpenChange={handleOpenChange}>
  <CommandDialogPopup>
    {#if !aiState.mode}
      {#key commandResetKey}
        <Command>
          <div class="relative flex items-center *:first:flex-1">
            <CommandInput
              bind:ref={searchInputEl}
              oninput={(e) => { searchQuery = (e.currentTarget as HTMLInputElement).value; }}
              onkeydown={(e) => {
                if (e.key === "Tab") { e.preventDefault(); handleAskAI(); }
                if (e.key === "Enter" && !hasResults && searchQuery.trim()) {
                  e.preventDefault();
                  handleAskAI();
                }
              }}
              placeholder="Type a command or search..."
              value={searchQuery}
            />
            <Button
              class="me-2.5 rounded-md not-hover:text-muted-foreground text-sm sm:text-xs"
              onclick={handleAskAI}
              size="sm"
              variant="ghost"
            >
              <Sparkles class="size-4 sm:size-3.5" />
              Ask AI
              <Kbd class="ms-0.5 -me-1.5">Tab</Kbd>
            </Button>
          </div>
          <CommandPanel>
            <CommandEmpty class="not-empty:py-12">
              {#if searchQuery.trim()}
                <div class="wrap-break-word flex flex-col flex-wrap items-center gap-2">
                  <EmptyMedia variant="icon"><Search /></EmptyMedia>
                  <p>No results found.</p>
                  <p>
                    Press <Kbd>Enter</Kbd> to ask AI about:
                    <br />
                    <strong class="font-medium text-foreground">{searchQuery}</strong>
                  </p>
                </div>
              {/if}
            </CommandEmpty>
            <CommandList>
              {#each commandGroups as group (group.value)}
                <CommandGroup>
                  <CommandGroupLabel>{group.value}</CommandGroupLabel>
                  <CommandCollection>
                    {#each group.items as item (item.value)}
                      <CommandItem value={item.value} onSelect={handleItemClick}>
                        <span class="flex-1">{item.label}</span>
                        {#if item.shortcut}
                          <CommandShortcut>{item.shortcut}</CommandShortcut>
                        {/if}
                      </CommandItem>
                    {/each}
                  </CommandCollection>
                </CommandGroup>
                <CommandSeparator />
              {/each}
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            {#if hasResults}
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <KbdGroup>
                    <Kbd><ArrowUp /></Kbd>
                    <Kbd><ArrowDown /></Kbd>
                  </KbdGroup>
                  <span>Navigate</span>
                </div>
                <div class="flex items-center gap-2">
                  <Kbd><CornerDownLeft /></Kbd>
                  <span>Open</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <Kbd>Esc</Kbd>
                <span>Close</span>
              </div>
            {:else}
              <div class="ms-auto flex items-center gap-2">
                <Kbd>Esc</Kbd>
                <span>Close</span>
              </div>
            {/if}
          </CommandFooter>
        </Command>
      {/key}
    {:else}
      <Command>
        <div class="flex items-center *:first:flex-1">
          <div class="px-2.5 py-1.5">
            <div class="relative w-full">
              <div
                aria-hidden="true"
                class="pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:-mx-0.5"
              >
                <Sparkles />
              </div>
              <Input
                bind:ref={aiInputEl}
                aria-label="AI query input"
                class="border-transparent! bg-transparent! shadow-none before:hidden has-focus-visible:ring-0 *:data-[slot=input]:ps-[calc(--spacing(8.5)-1px)] sm:*:data-[slot=input]:ps-[calc(--spacing(8)-1px)]"
                disabled={aiState.isGenerating}
                oninput={(e) => { aiState = { ...aiState, query: (e.currentTarget as HTMLInputElement).value }; }}
                onkeydown={(e) => {
                  if (e.key === "Enter" && !aiState.isGenerating) handleGenerateAI();
                  if (e.key === "Escape") { e.preventDefault(); handleBackToSearch(); }
                }}
                placeholder="Ask AI anything…"
                size="lg"
                value={aiState.query}
              />
            </div>
          </div>
          <Button
            class="me-2.5 rounded-md not-hover:text-muted-foreground text-sm sm:text-xs"
            onclick={handleBackToSearch}
            size="sm"
            variant="ghost"
          >
            <ArrowLeft class="size-4 sm:size-3.5" />
            Back to search
            <Kbd class="ms-0.5 -me-1.5">Esc</Kbd>
          </Button>
        </div>
        <CommandPanel>
          <ScrollArea scrollbarGutter scrollFade>
            <div class="p-5">
              {#if !aiState.isGenerating && !aiState.response && !aiState.error}
                <div class="flex items-center justify-center py-12">
                  <p class="text-muted-foreground text-sm">
                    Ask AI anything and press <Kbd>Enter</Kbd> to get started.
                  </p>
                </div>
              {/if}

              {#if aiState.error}
                <div aria-live="polite" class="text-destructive text-sm" role="alert">
                  {aiState.error}
                </div>
              {/if}

              {#if aiState.isGenerating}
                <div class="flex flex-col gap-4">
                  <div class="flex flex-col gap-2">
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-4 w-1/2" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-4 w-3/4" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-4 w-full" />
                    <Skeleton class="h-4 w-3/5" />
                  </div>
                </div>
              {/if}

              {#if aiState.response && !aiState.isGenerating}
                <div
                  aria-live="polite"
                  class="text-muted-foreground text-sm **:[a]:underline **:[a]:underline-offset-4 **:[code]:rounded-md **:[code]:bg-muted **:[code]:px-[0.3rem] **:[code]:py-[0.2rem] **:[code]:font-mono **:[p]:not-first:mt-3 **:[p]:leading-relaxed **:[strong,a]:font-medium **:[strong,a]:text-foreground"
                >
                  {@html markdownToSafeHTML(aiState.response)}
                </div>
                {#if aiState.referenceLinks.length > 0}
                  <div class="mt-4 flex flex-wrap gap-2">
                    {#each aiState.referenceLinks as link (link.url)}
                      <Button href={link.url} size="sm" variant="secondary">
                        {link.title}
                      </Button>
                    {/each}
                  </div>
                {/if}
              {/if}
            </div>
          </ScrollArea>
        </CommandPanel>
        <CommandFooter>
          {#if aiState.isGenerating}
            <div aria-live="polite" class="flex items-center gap-2">
              <div class="flex h-5 items-center justify-center">
                <Spinner class="size-3" />
              </div>
              <span class="animate-pulse">Generating response…</span>
            </div>
          {:else if aiState.response}
            <div class="flex items-center gap-2">
              <div class="flex h-5 items-center justify-center">
                <CircleHelp class="size-3" />
              </div>
              You asked: <span>"{aiState.submittedQuery}"</span>
            </div>
          {:else}
            <div class="flex items-center gap-2">
              <Kbd><CornerDownLeft /></Kbd>
              <span>Ask AI</span>
            </div>
          {/if}
        </CommandFooter>
      </Command>
    {/if}
  </CommandDialogPopup>
</CommandDialog>
