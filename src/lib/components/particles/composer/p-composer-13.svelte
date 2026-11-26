<script lang="ts">
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import { tick } from 'svelte';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import {
    Composer,
    ComposerActionGroup,
    ComposerActions,
    ComposerInput,
    ComposerItem,
    type ComposerItemValue,
    ComposerList,
    type ComposerPart,
    ComposerPopup,
    ComposerSubmit,
    ComposerToken,
    type ComposerValue,
    getComposerText,
    useComposerFilter
  } from '#lib/components/ui/composer/index.js';
  import { Kbd } from '#lib/components/ui/kbd/index.js';

  type Tag = { id: string; label: string; color: string; people: string[] };

  const slug = (name: string) => name.toLowerCase().replaceAll(' ', '-');
  const peopleCount = (count: number) => `${count} ${count === 1 ? 'person' : 'people'}`;

  const photo = (id: string) => `https://images.unsplash.com/photo-${id}?w=96&h=96&dpr=2&q=80`;

  const memberData = [
    ['Alex Morgan', 'Design', '1543610892-0b1f7e6d8ac1'],
    ['Sam Rivera', 'Engineering', '1507003211169-0a1dd7228f2d'],
    ['Taylor Kim', 'Product', '1472099645785-5658abf4ff4e'],
    ['Jordan Lee', 'Marketing', '1500648767791-00dcc994a43e'],
    ['Casey Chen', 'Support', '1494790108377-be9c29b29330'],
    ['Morgan Davis', 'Operations', '1655874819398-c6dfbec68ac7'],
    ['Jamie Wilson', 'Finance', '1438761681033-6461ffad8d80'],
    ['Riley Patel', 'Research', '1628157588553-5eeea00af15c']
  ] as const;

  const members: ComposerItemValue[] = memberData.map(([label, description]) => ({
    description,
    id: `member:${slug(label)}`,
    kind: 'member',
    label
  }));

  const photos: Record<string, string> = Object.fromEntries(
    memberData.map(([label, , image]) => [`member:${slug(label)}`, photo(image)])
  );

  const tags: Tag[] = [
    {
      color: 'bg-sky-500',
      id: 'tag:clients',
      label: 'Clients',
      people: ['Ben Carter', 'Chloe Martin', 'Sarah Lim', 'Tom Okafor', 'Ava Novak']
    },
    {
      color: 'bg-amber-500',
      id: 'tag:newsletter',
      label: 'Newsletter',
      people: [
        'Aiden Brooks',
        'Bella Ortiz',
        'Caleb Foster',
        'Daisy Nguyen',
        'Elijah Grant',
        'Fiona Walsh',
        'Gabriel Silva',
        'Hannah Reed',
        'Isaac Moreno',
        'Julia Hart',
        'Kai Thompson',
        'Lena Fischer',
        'Mason Clarke',
        'Nora Bennett',
        'Oscar Diaz',
        'Priya Shah',
        'Quinn Murphy',
        'Rosa Alvarez',
        'Sarah Lim',
        'Tara Quinn',
        'Umar Haddad',
        'Vera Lindqvist',
        'Wes Turner',
        'Xena Park',
        'Yusuf Demir'
      ]
    }
  ];

  const tagsOf = (name: string) => tags.filter((tag) => tag.people.includes(name));

  const contacts: ComposerItemValue[] = [...new Set(tags.flatMap((tag) => tag.people))]
    .sort((a, b) => a.localeCompare(b))
    .map((label) => ({
      description: `${slug(label).replace('-', '.')}@example.com`,
      id: `contact:${slug(label)}`,
      kind: 'contact',
      label
    }));

  const tagItems: ComposerItemValue[] = tags.map((tag) => ({
    description: peopleCount(tag.people.length),
    id: tag.id,
    kind: 'tag',
    label: tag.label
  }));

  const sections = [
    { kind: 'member', label: 'Team members' },
    { kind: 'contact', label: 'Contacts' },
    { kind: 'tag', label: 'Tags' }
  ] as const;

  function getSegments(input: HTMLElement, draft: ComposerValue) {
    const chips = draft.filter((part) => part.type !== 'text');
    let offset = 0;
    return Array.from(input.childNodes, (node) => {
      const length =
        node instanceof Text
          ? node.length
          : node instanceof HTMLBRElement
            ? 1
            : getComposerText(chips.splice(0, 1)).length;
      offset += length;
      return { end: offset, node, start: offset - length };
    });
  }

  /** Replace `start..end` of the draft's text, merging the surrounding text parts. */
  function spliceText(
    draft: ComposerValue,
    start: number,
    end: number,
    insert: readonly ComposerPart[]
  ): ComposerValue {
    let offset = 0;
    const parts = draft.flatMap((part): ComposerPart[] => {
      const from = offset;
      offset += getComposerText([part]).length;
      if (part.type !== 'text' || start < from || start >= offset) return [part];
      return [
        { type: 'text', text: part.text.slice(0, start - from) },
        ...insert,
        { type: 'text', text: part.text.slice(end - from) }
      ];
    });
    const merged: ComposerPart[] = [];
    for (const part of parts) {
      const previous = merged.at(-1);
      if (part.type !== 'text') merged.push(part);
      else if (previous?.type === 'text')
        merged[merged.length - 1] = { type: 'text', text: previous.text + part.text };
      else if (part.text) merged.push(part);
    }
    return merged;
  }

  const initials = (name: string) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('');

  const { contains, startsWith } = useComposerFilter();
  const sectionId = $props.id();

  let value = $state.raw<ComposerValue>([]);
  let queryText = $state('');
  let inputElement = $state<HTMLElement | null>(null);
  let listElement = $state<HTMLDivElement | null>(null);
  let keptOpen = false;

  const matches = $derived(
    [...members, ...contacts, ...tagItems].filter(
      (item) =>
        contains(item.label, queryText) ||
        (item.kind === 'member' && contains(item.description ?? '', queryText)) ||
        (item.kind === 'contact' &&
          tagsOf(item.label).some((tag) => contains(tag.label, queryText)))
    )
  );

  const startsTag = (item: ComposerItemValue) =>
    item.kind === 'tag' && startsWith(item.label, queryText);

  const visibleSections = $derived.by(() => {
    const tagFirst = queryText.length >= 2 && matches.some(startsTag);
    return (tagFirst ? [sections[2], sections[0], sections[1]] : sections)
      .map((section) => ({
        ...section,
        items: matches
          .filter((item) => item.kind === section.kind)
          .sort((a, b) => Number(startsTag(b)) - Number(startsTag(a)))
      }))
      .filter((section) => section.items.length);
  });

  const items = $derived(visibleSections.flatMap((section) => section.items));

  /** The `@query` that ends at the caret, as offsets into the draft's text. */
  function findQuery() {
    const selection = window.getSelection();
    if (!inputElement || !selection?.isCollapsed) return null;
    const segment = getSegments(inputElement, value).find(
      ({ node }) => node === selection.anchorNode
    );
    if (!segment) return null;
    const caret = segment.start + selection.anchorOffset;
    const start = getComposerText(value).lastIndexOf('@', caret - 1);
    return start < 0 ? null : { caret, start };
  }

  /** Update the draft, then put the caret at `target` once the input has re-rendered. */
  async function setDraft(next: ComposerValue, target: number) {
    value = next;
    await tick();
    if (!inputElement) return;
    const segment = getSegments(inputElement, next).find(
      ({ node, start, end }) => node instanceof Text && start <= target && target <= end
    );
    if (!segment) return;
    window.getSelection()?.collapse(segment.node, target - segment.start);
    document.dispatchEvent(new Event('selectionchange'));
  }

  async function mentionAndKeepOpen(item: ComposerItemValue) {
    const query = findQuery();
    if (!query) return;
    const chip: ComposerPart = {
      id: item.id,
      kind: item.kind,
      label: item.label,
      trigger: '@',
      type: 'mention'
    };
    const typed = getComposerText(value).slice(query.start, query.caret);
    const insert: ComposerPart[] = [chip, { text: ` ${typed}`, type: 'text' }];
    await setDraft(
      spliceText(value, query.start, query.caret, insert),
      query.start + getComposerText(insert).length
    );
    // Set last: rewriting the draft briefly clears the query, which resets this flag.
    keptOpen = true;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.isComposing) return;
    const highlighted = listElement?.querySelector<HTMLElement>('[data-highlighted]');
    if (!highlighted) return;
    if (event.key === 'Enter' && event.shiftKey) {
      const item = items.find((entry) => entry.id === highlighted.dataset.id);
      if (!item) return;
      event.preventDefault();
      mentionAndKeepOpen(item);
    } else if (event.key === 'Escape' && keptOpen) {
      const query = findQuery();
      if (!query) return;
      setDraft(spliceText(value, query.start, query.caret, []), query.start);
    }
  }
</script>

{#snippet dot(color: string | undefined, className: string)}
  <span class={['shrink-0 rounded-full', color, className]}></span>
{/snippet}

<Composer
  class="w-full max-w-xl"
  bind:value
  getSuggestionsAnnouncement={(count) =>
    `${count} suggestion${count === 1 ? '' : 's'} available. Use the up and down arrow keys to navigate. Hold Shift while pressing Enter to mention several.`}
  onQueryChange={(query) => {
    if (!query) keptOpen = false;
    queryText = query?.text ?? '';
  }}
  onSubmit={() => (value = [])}
  triggers={[{ character: '@', filter: null, items }]}
>
  <ComposerInput
    bind:ref={inputElement}
    aria-label="Message"
    onkeydown={handleKeyDown}
    placeholder="Type @ to mention someone or a tag…"
  >
    {#snippet renderToken(token)}
      {#if token.kind === 'tag'}
        <ComposerToken {token} variant="chip">
          {#snippet icon()}
            {@render dot(tags.find((tag) => tag.id === token.id)?.color, 'inline-block size-2')}
          {/snippet}
        </ComposerToken>
      {:else}
        <ComposerToken {token} variant="chip">{token.trigger}{token.label}</ComposerToken>
      {/if}
    {/snippet}
  </ComposerInput>
  <ComposerPopup>
    <ComposerList bind:ref={listElement}>
      {#snippet fallback()}
        {#each visibleSections as section (section.kind)}
          {@const labelId = `${sectionId}-${section.kind}`}
          <div aria-labelledby={labelId} class="[[role=group]+&]:mt-1.5" role="group">
            <div class="px-2 py-1.5 font-medium text-muted-foreground text-xs" id={labelId}>
              {section.label}
            </div>
            {#each section.items as item (item.id)}
              {@const tag = tags.find((entry) => entry.id === item.id)}
              {@const personTags = item.kind === 'contact' ? tagsOf(item.label) : []}
              <ComposerItem
                data-id={item.id}
                onclick={(event) => {
                  if (!event.shiftKey) return;
                  event.preventDefault();
                  mentionAndKeepOpen(item);
                }}
                value={item}
              >
                {#if tag}
                  <span aria-hidden="true" class="flex size-5 shrink-0 items-center justify-center">
                    {@render dot(tag.color, 'size-2')}
                  </span>
                {:else}
                  <Avatar
                    aria-hidden="true"
                    class="mt-0.5 self-start [--avatar-size:--spacing(5)] sm:mt-0"
                  >
                    {#if photos[item.id]}
                      <AvatarImage alt="" src={photos[item.id]} />
                    {/if}
                    <AvatarFallback>{initials(item.label)}</AvatarFallback>
                  </Avatar>
                {/if}
                <span class={['flex min-w-0 flex-auto', tag ? 'items-baseline gap-2' : 'flex-col']}>
                  <span class="max-w-full shrink-0 truncate">{item.label}</span>
                  <span class="min-w-0 truncate text-muted-foreground text-xs">
                    {item.description}
                  </span>
                </span>
                {#if personTags.length > 0}
                  <span class="flex flex-wrap items-center justify-end gap-1">
                    {#each personTags as personTag (personTag.id)}
                      <Badge variant="outline">
                        {@render dot(personTag.color, 'size-1.5')}
                        {personTag.label}
                      </Badge>
                    {/each}
                  </span>
                {/if}
              </ComposerItem>
            {/each}
          </div>
        {/each}
      {/snippet}
    </ComposerList>
    <div
      aria-hidden="true"
      class="flex pointer-coarse:hidden items-center gap-1.5 border-t px-3 py-2 text-muted-foreground text-xs"
    >
      Hold <Kbd>Shift</Kbd> to mention several
    </div>
  </ComposerPopup>
  <ComposerActions>
    <ComposerActionGroup align="end">
      <ComposerSubmit aria-label="Send message" size="icon">
        <ArrowUp aria-hidden="true" />
      </ComposerSubmit>
    </ComposerActionGroup>
  </ComposerActions>
</Composer>
