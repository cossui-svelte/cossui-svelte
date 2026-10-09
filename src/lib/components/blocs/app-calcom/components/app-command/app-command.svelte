<script lang="ts">
  import ArrowDown from '@lucide/svelte/icons/arrow-down';
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import CircleQuestionMark from '@lucide/svelte/icons/circle-question-mark';
  import CornerDownLeft from '@lucide/svelte/icons/corner-down-left';
  import Search from '@lucide/svelte/icons/search';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Command,
    CommandCollection,
    CommandDialog,
    CommandDialogPopup,
    CommandEmpty,
    CommandFooter,
    CommandGroup,
    CommandGroupLabel,
    CommandInput,
    CommandItem,
    CommandList,
    CommandPanel,
    CommandSeparator,
    CommandShortcut
  } from '#lib/components/ui/command/index.js';
  import { EmptyMedia } from '#lib/components/ui/empty/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Kbd, KbdGroup } from '#lib/components/ui/kbd/index.js';
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
  import { Spinner } from '#lib/components/ui/spinner/index.js';
  import { markdownToSafeHTML } from '../../lib/markdown-to-safe-html.js';
  import {
    MOCK_AI_RESPONSE,
    MOCK_REFERENCE_LINKS,
    type ReferenceLink
  } from '../../lib/mock-ai-data.js';
  import { href, router } from '../../lib/router.svelte.js';
  import { commandHandle } from './command-handle.js';

  interface Item {
    keywords?: string[];
    label: string;
    shortcut?: string;
    value: string;
  }

  interface Group {
    items: Item[];
    value: string;
  }

  // Items that map to an existing route navigate there; every other item only closes the dialog.
  const itemRoutes: Record<string, string> = {
    'event-types': '/event-types',
    upcoming: '/booking/upcoming',
    recurring: '/booking/recurring',
    past: '/booking/past',
    canceled: '/booking/canceled',
    webhooks: '/settings/developer/webhooks',
    'api-keys': '/settings/developer/api-keys',
    'change-password': '/settings/security/password',
    'two-factor-auth': '/settings/security/two-factor-auth',
    'user-impersonation': '/settings/security/impersonation',
    'manage-billing': '/settings/billing',
    profile: '/settings/my-account/profile'
  };

  const commandGroups: Group[] = [
    {
      items: [
        {
          keywords: ['wf'],
          label: 'Workflows',
          shortcut: 'w f',
          value: 'workflows'
        }
      ],
      value: 'Workflows'
    },
    {
      items: [
        {
          keywords: ['et'],
          label: 'Event Types',
          shortcut: 'e t',
          value: 'event-types'
        },
        { label: '15 Min Meeting', value: '15-min-meeting' },
        { label: '30 Min Meeting', value: '30-min-meeting' },
        { label: 'Secret Meeting', value: 'secret-meeting' }
      ],
      value: 'Event Types'
    },
    {
      items: [
        {
          keywords: ['as'],
          label: 'App Store',
          shortcut: 'a s',
          value: 'app-store'
        }
      ],
      value: 'Apps'
    },
    {
      items: [
        {
          keywords: ['ub'],
          label: 'Upcoming',
          shortcut: 'u b',
          value: 'upcoming'
        },
        {
          keywords: ['rb'],
          label: 'Recurring',
          shortcut: 'r b',
          value: 'recurring'
        },
        { keywords: ['pb'], label: 'Past', shortcut: 'p b', value: 'past' },
        {
          keywords: ['cb'],
          label: 'Canceled',
          shortcut: 'c b',
          value: 'canceled'
        }
      ],
      value: 'Bookings'
    },
    {
      items: [
        {
          keywords: ['sa'],
          label: 'Availability',
          shortcut: 's a',
          value: 'availability'
        }
      ],
      value: 'Availability'
    },
    {
      items: [
        {
          keywords: ['ps'],
          label: 'Profile',
          shortcut: 'p s',
          value: 'profile'
        },
        {
          keywords: ['ca'],
          label: 'Change Avatar',
          shortcut: 'c a',
          value: 'change-avatar'
        },
        {
          keywords: ['ct'],
          label: 'Timezone',
          shortcut: 'c t',
          value: 'timezone'
        },
        {
          keywords: ['bc'],
          label: 'Brand Color',
          shortcut: 'b c',
          value: 'brand-color'
        },
        { keywords: ['ts'], label: 'Teams', shortcut: 't s', value: 'teams' }
      ],
      value: 'Profile'
    },
    {
      items: [
        {
          keywords: ['cp'],
          label: 'Change Password',
          shortcut: 'c p',
          value: 'change-password'
        },
        {
          keywords: ['tfa'],
          label: 'Two factor authentication',
          shortcut: 't f a',
          value: 'two-factor-auth'
        },
        {
          keywords: ['ui'],
          label: 'User Impersonation',
          shortcut: 'u i',
          value: 'user-impersonation'
        }
      ],
      value: 'Security'
    },
    {
      items: [
        {
          keywords: ['ul'],
          label: 'Choose a license',
          shortcut: 'u l',
          value: 'choose-license'
        }
      ],
      value: 'Admin'
    },
    {
      items: [
        {
          keywords: ['wh'],
          label: 'Webhooks',
          shortcut: 'w h',
          value: 'webhooks'
        },
        {
          keywords: ['api'],
          label: 'API keys',
          shortcut: 'a p i',
          value: 'api-keys'
        }
      ],
      value: 'Developer'
    },
    {
      items: [
        {
          keywords: ['mb'],
          label: 'Manage billing',
          shortcut: 'm b',
          value: 'manage-billing'
        }
      ],
      value: 'Billing'
    },
    {
      items: [
        { label: 'Alby', value: 'alby' },
        { label: 'Amie', value: 'amie' },
        { label: 'Apple Calendar', value: 'apple-calendar' },
        { label: 'Attio', value: 'attio' },
        { label: 'Autocheckin', value: 'autocheckin' },
        { label: 'BAA for HIPAA', value: 'baa-hipaa' }
      ],
      value: 'Installable Apps'
    }
  ];

  interface AIState {
    error: string | null;
    isGenerating: boolean;
    mode: boolean;
    query: string;
    referenceLinks: ReferenceLink[];
    response: string;
    submittedQuery: string;
  }

  const initialAIState: AIState = {
    error: null,
    isGenerating: false,
    mode: false,
    query: '',
    referenceLinks: [],
    response: '',
    submittedQuery: ''
  };

  let open = $state(false);
  let aiState = $state<AIState>({ ...initialAIState });
  let searchQuery = $state('');
  let aiInputEl = $state<HTMLInputElement | null>(null);
  let searchInputEl = $state<HTMLInputElement | null>(null);
  let abortController: AbortController | null = null;
  let commandResetKey = $state(0);

  const { contains } = AutocompletePrimitive.createFilter({ sensitivity: 'base' });

  function filterItem(itemValue: unknown, query: string): boolean {
    if (typeof itemValue !== 'object' || itemValue === null) return false;
    const item = itemValue as Item;
    return (
      contains(item.label, query) ||
      contains(item.value, query) ||
      (item.keywords?.some((keyword) => contains(keyword, query)) ?? false)
    );
  }

  const hasResults = $derived(
    !searchQuery.trim() ||
      commandGroups.some((group) => group.items.some((item) => filterItem(item, searchQuery)))
  );

  function resetAIState() {
    abortController?.abort();
    aiState = { ...initialAIState };
  }

  function handleItemClick(item: Item) {
    open = false;
    const route = itemRoutes[item.value];
    if (route) router.navigate(route);
  }

  function handleBackToSearch() {
    resetAIState();
    searchQuery = '';
    // Force Command remount to reset Autocomplete's internal query state
    commandResetKey += 1;
    queueMicrotask(() => searchInputEl?.focus());
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
      query: '',
      referenceLinks: [],
      response: '',
      submittedQuery: query
    };

    try {
      // Simulate AI response - in production, this would call an API
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(resolve, 1500);
        controller.signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('aborted'));
        });
      });

      if (controller.signal.aborted) return;

      aiState = {
        ...aiState,
        isGenerating: false,
        referenceLinks: MOCK_REFERENCE_LINKS,
        response: MOCK_AI_RESPONSE
      };
    } catch (error) {
      if (error instanceof Error && error.message === 'aborted') return;
      if (controller.signal.aborted) return;
      aiState = {
        ...aiState,
        error: 'Failed to generate response. Please try again.',
        isGenerating: false
      };
    }
  }

  function handleAskAI() {
    const currentQuery = searchQuery;
    searchQuery = '';

    if (currentQuery.trim()) {
      aiState = { ...aiState, mode: true };
      handleGenerateAI(currentQuery);
    } else {
      aiState = { ...aiState, mode: true, query: '' };
      aiInputEl?.focus();
    }
  }

  function handleOpenChange(newOpen: boolean) {
    open = newOpen;
    if (!newOpen) {
      searchQuery = '';
      resetAIState();
    }
  }

  // Cleanup on unmount
  $effect(() => () => abortController?.abort());

  $effect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        const target = e.target;
        if (
          (target instanceof HTMLElement && target.isContentEditable) ||
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        if (!open) searchQuery = '';
        open = !open;
      }
    }
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  });

  $effect(() => {
    if (!open || !aiState.mode) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleBackToSearch();
      }
    }
    document.addEventListener('keydown', handleEscape, true);
    return () => document.removeEventListener('keydown', handleEscape, true);
  });

  $effect(() => {
    if (aiState.mode && !aiState.isGenerating) {
      // Focus AI input when switching to AI mode or after response
      aiInputEl?.focus();
    }
  });
</script>

<CommandDialog handle={commandHandle} {open} onOpenChange={handleOpenChange}>
  <CommandDialogPopup>
    {#if !aiState.mode}
      {#key commandResetKey}
        <Command filter={filterItem} items={commandGroups} bind:value={searchQuery}>
          <div class="relative flex items-center *:first:flex-1">
            <CommandInput
              bind:ref={searchInputEl}
              onkeydown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault();
                  handleAskAI();
                }
                if (e.key === 'Enter' && !hasResults && searchQuery.trim()) {
                  e.preventDefault();
                  handleAskAI();
                }
              }}
              placeholder="Type a command or search..."
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
              <CommandCollection>
                {#snippet children(group: Group)}
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {#snippet children(item: Item)}
                        <CommandItem value={item} onclick={() => handleItemClick(item)}>
                          <span class="flex-1">{item.label}</span>
                          {#if item.shortcut}
                            <CommandShortcut>{item.shortcut}</CommandShortcut>
                          {/if}
                        </CommandItem>
                      {/snippet}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                {/snippet}
              </CommandCollection>
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
                class="pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 has-[+[data-size=sm]]:ps-[calc(--spacing(2.5)-1px)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:-mx-0.5"
                data-slot="autocomplete-start-addon"
              >
                <Sparkles />
              </div>
              <Input
                bind:ref={aiInputEl}
                aria-label="AI query input"
                class="border-transparent! bg-transparent! shadow-none before:hidden has-focus-visible:ring-0 *:data-[slot=input]:ps-[calc(--spacing(8.5)-1px)] sm:*:data-[slot=input]:ps-[calc(--spacing(8)-1px)]"
                disabled={aiState.isGenerating}
                oninput={(e) => {
                  aiState = { ...aiState, query: (e.currentTarget as HTMLInputElement).value };
                }}
                onkeydown={(e) => {
                  if (e.key === 'Enter' && !aiState.isGenerating) handleGenerateAI();
                  if (e.key === 'Escape') {
                    e.preventDefault();
                    handleBackToSearch();
                  }
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
          <ScrollArea overscrollContain scrollbarGutter scrollFade>
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
                    <div class="h-4 w-full animate-pulse rounded-sm bg-muted"></div>
                    <div class="h-4 w-5/6 animate-pulse rounded-sm bg-muted"></div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <div class="h-4 w-full animate-pulse rounded-sm bg-muted"></div>
                    <div class="h-4 w-3/4 animate-pulse rounded-sm bg-muted"></div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <div class="h-4 w-full animate-pulse rounded-sm bg-muted"></div>
                    <div class="h-4 w-full animate-pulse rounded-sm bg-muted"></div>
                    <div class="h-4 w-2/4 animate-pulse rounded-sm bg-muted"></div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <div class="h-4 w-full animate-pulse rounded-sm bg-muted"></div>
                    <div class="h-4 w-4/5 animate-pulse rounded-sm bg-muted"></div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <div class="h-4 w-full animate-pulse rounded-sm bg-muted"></div>
                    <div class="h-4 w-3/4 animate-pulse rounded-sm bg-muted"></div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <div class="h-4 w-full animate-pulse rounded-sm bg-muted"></div>
                    <div class="h-4 w-2/3 animate-pulse rounded-sm bg-muted"></div>
                  </div>
                </div>
              {/if}

              {#if aiState.response && !aiState.isGenerating}
                <div
                  aria-live="polite"
                  class="text-muted-foreground text-sm **:[a]:underline **:[a]:underline-offset-4 **:[code]:rounded-md **:[code]:bg-muted **:[code]:px-[0.3rem] **:[code]:py-[0.2rem] **:[code]:font-mono **:[h1,h2,h3,strong,a]:font-medium **:[h1,h2,h3,strong,a]:text-foreground **:[h1,h2,h3]:not-first:mt-4 **:[h1,h2,h3]:text-base **:[p]:not-first:mt-3 **:[p]:leading-relaxed **:[ul]:my-3 **:[ul]:ms-4 **:[ul]:list-disc"
                >
                  <!-- eslint-disable-next-line svelte/no-at-html-tags -- markdownToSafeHTML sanitizes the output with DOMPurify -->
                  {@html markdownToSafeHTML(aiState.response)}
                </div>
                {#if aiState.referenceLinks.length > 0}
                  <div class="mt-8 flex flex-wrap gap-2">
                    {#each aiState.referenceLinks as link, index (`${link.url}-${index}`)}
                      <Button href={href(link.url)} size="sm" variant="secondary">
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
                <CircleQuestionMark class="size-3" />
              </div>
              You asked:<span>"{aiState.submittedQuery}"</span>
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
