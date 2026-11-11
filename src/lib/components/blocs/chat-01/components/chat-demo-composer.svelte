<script lang="ts">
  import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
  import type { Snippet } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import { ChatTip } from '#lib/components/ui/chat/chat-tip.svelte.js';
  import {
    Composer,
    ComposerActionGroup,
    ComposerActions,
    ComposerInput,
    ComposerItem,
    ComposerList,
    ComposerPopup,
    ComposerSubmit,
    type ComposerItemValue,
    type ComposerTrigger,
    type ComposerValue
  } from '#lib/components/ui/composer/index.js';
  import { Tooltip, TooltipPopup } from '#lib/components/ui/tooltip/index.js';
  import { searchEmoji } from '#lib/data/emoji.js';
  import { cn } from '#lib/utils.js';
  import ChatDemoMemberAvatar from './chat-demo-member-avatar.svelte';
  import { CHAT_MEMBERS, type MemberId } from './chat-demo-state';

  type Props = {
    class?: string;
    value: ComposerValue;
    replyAuthor?: string;
    placeholder?: string;
    showKeyboardHint?: boolean;
    startAction?: Snippet;
    mentionMembers: readonly MemberId[];
    onSend: () => void;
    inputRef?: HTMLElement | null;
    notice: string;
    disabled?: boolean;
  };

  let {
    class: className,
    value = $bindable(),
    replyAuthor,
    placeholder = 'Message the group…',
    showKeyboardHint = true,
    startAction,
    mentionMembers,
    onSend,
    inputRef = $bindable(null),
    notice,
    disabled = false
  }: Props = $props();

  const hintId = $props.id();
  const touchInput = new MediaQuery('pointer: coarse');
  const sendTip = new ChatTip();

  function isMemberId(id: string): id is MemberId {
    return Object.hasOwn(CHAT_MEMBERS, id);
  }

  function mentionMatchesHandle(item: ComposerItemValue, query: string): boolean {
    return item.label.toLocaleLowerCase().startsWith(query.toLocaleLowerCase());
  }

  let emoji = $state<ComposerItemValue[]>([]);

  const triggers = $derived<ComposerTrigger[]>([
    {
      character: '@',
      filter: mentionMatchesHandle,
      items: mentionMembers.map((id) => ({ id, label: CHAT_MEMBERS[id].handle }))
    },
    { character: ':', items: emoji, filter: null }
  ]);
</script>

<div
  class={cn(
    'relative z-20 flex shrink-0 flex-col gap-2.5 px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]',
    className
  )}
>
  <Composer
    class="[--composer-max-rows:4] data-disabled:opacity-50 max-md:data-[layout=adaptive]:not-data-multiline:px-1 max-md:[--composer-min-rows:1] max-md:[--composer-padding:--spacing(1)] max-md:[--composer-radius:calc(--spacing(5.5)+1px)] sm:max-md:[--composer-radius:calc(--spacing(5)+1px)] md:[--composer-max-rows:6] md:[--composer-min-rows:2] pointer-coarse:[&_[data-slot=composer-scroll-area]_[data-slot=scroll-area-scrollbar]]:hidden"
    {disabled}
    layout="adaptive"
    submitOnEnter="desktop"
    {triggers}
    bind:value
    onQueryChange={(query) => {
      emoji = query?.character === ':' ? searchEmoji(query.text) : [];
    }}
    onSubmit={onSend}
  >
    <ComposerInput
      bind:ref={inputRef}
      aria-describedby={showKeyboardHint && !touchInput.current ? hintId : undefined}
      aria-label="Message"
      class="max-md:px-2"
      placeholder={replyAuthor ? `Reply to ${replyAuthor}…` : placeholder}
    />
    <ComposerPopup>
      <ComposerList>
        {#snippet children(item)}
          {#if item.type === 'text'}
            <ComposerItem value={item}>
              <span class="shrink-0 text-xl/none">{item.text}</span>
              <span class="truncate text-muted-foreground">:{item.label}:</span>
            </ComposerItem>
          {:else if isMemberId(item.id)}
            <ComposerItem value={item}>
              <ChatDemoMemberAvatar class="size-4 text-[0.5rem]" member={item.id} />
              <span class="min-w-0 truncate">{CHAT_MEMBERS[item.id].name}</span>
            </ComposerItem>
          {/if}
        {/snippet}
      </ComposerList>
    </ComposerPopup>
    <ComposerActions class="max-md:mx-1">
      {#if startAction}
        <ComposerActionGroup
          align="start"
          class="in-[[data-layout=adaptive]:not([data-multiline])]:me-0"
        >
          {@render startAction()}
        </ComposerActionGroup>
      {/if}
      <ComposerActionGroup align="end">
        <Tooltip bind:open={sendTip.open}>
          <ComposerSubmit
            bind:ref={sendTip.anchor}
            aria-label="Send message"
            class="rounded-full before:rounded-full"
            size="icon"
            {...sendTip.props}
          >
            <ArrowUpIcon aria-hidden="true" class="size-4 md:size-4.5" />
          </ComposerSubmit>
          <TooltipPopup customAnchor={sendTip.anchor} side="bottom">Send message</TooltipPopup>
        </Tooltip>
      </ComposerActionGroup>
    </ComposerActions>
  </Composer>
  <div
    class={cn(
      (touchInput.current || !showKeyboardHint) && !notice
        ? 'sr-only'
        : 'flex min-h-4 items-center justify-between px-1 text-muted-foreground text-xs',
      disabled && 'opacity-50'
    )}
  >
    <span aria-live="polite" role="status">{notice}</span>
    {#if showKeyboardHint && !touchInput.current}
      <span class={notice ? 'sr-only' : 'ms-auto pointer-coarse:hidden'} id={hintId}>
        Enter to send <span class="px-1.5 opacity-40">/</span> Shift + Enter for a new line
      </span>
    {/if}
  </div>
</div>
