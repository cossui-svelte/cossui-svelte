<script lang="ts">
  import PhoneIcon from '@lucide/svelte/icons/phone';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import { onDestroy } from 'svelte';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    ChatConversation,
    ChatDeliveryIndicator,
    ChatMessage as ChatMessageView,
    ChatMessageActionToolbar,
    ChatReactionChip,
    ChatReactionPicker,
    ChatScroll,
    ChatTypingIndicator
  } from '#lib/components/ui/chat/index.js';
  import { type ComposerValue, getComposerText } from '#lib/components/ui/composer/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import ChatDemoComposer from '#lib/components/blocs/chat-01/components/chat-demo-composer.svelte';
  import ChatDemoMemberAvatar from '#lib/components/blocs/chat-01/components/chat-demo-member-avatar.svelte';
  import ChatDemoMessageBody from '#lib/components/blocs/chat-01/components/chat-demo-message-body.svelte';
  import ChatDemoReplyFocus, {
    type ChatReplyFocusTarget
  } from '#lib/components/blocs/chat-01/components/chat-demo-reply-focus.svelte';
  import {
    CHAT_EMOJI,
    CHAT_MEMBERS,
    type ChatMessage,
    type MemberId,
    toggleReaction
  } from '#lib/components/blocs/chat-01/components/chat-demo-state.js';
  import { cn } from '#lib/utils.js';
  import { ChatPreviewPlayback } from './chat-preview-playback.svelte';

  type Status = 'sending' | 'delivered' | 'read';

  const STATUS_LABELS: Record<Status, string> = {
    sending: 'Sending',
    delivered: 'Delivered',
    read: 'Read'
  };

  const message = (
    id: number,
    author: MemberId,
    text: string,
    extra: Partial<ChatMessage> = {}
  ): ChatMessage => ({
    id,
    author,
    text,
    dateLabel: 'Today',
    time: '10:42',
    reactions: [],
    ...extra
  });

  const GROUP_MESSAGES: ChatMessage[] = [
    message(1, 'maya', 'Pushed the new onboarding flow. Would love eyes on it before Friday.', {
      reactions: [{ emoji: '🙏', members: ['jordan'] }]
    }),
    message(2, 'jordan', 'Looks great, @Maya. The empty state is my favorite part.', {
      replyTo: 1,
      reactions: [{ emoji: '❤️', members: ['maya', 'alex'] }]
    }),
    message(3, 'you', 'Same here. Let’s ship it 🚀', { delivery: 'read' })
  ];

  const DIRECT_MESSAGES: ChatMessage[] = [
    message(1, 'maya', 'Hey Sam, can you review the onboarding flow?'),
    message(2, 'you', 'Just tried it. The empty state looks great!', {
      delivery: 'read',
      reactions: [{ emoji: '❤️', members: ['maya'] }]
    }),
    message(3, 'maya', 'Thanks! Shall we walk through the last details together?')
  ];

  const REPLIES = [
    'Love that. Adding it to the release notes.',
    'Good call, @Jordan will want to see this too.',
    'Perfect. Let’s keep the momentum going.'
  ];

  const DIRECT_REPLIES = [
    'Sounds good. I’ll send you the latest version.',
    'Thanks for taking a look. Your feedback helps!',
    'Perfect. Let’s catch up this afternoon.'
  ];

  let { direct = false }: { direct?: boolean } = $props();

  const previewId = $props.id();
  // svelte-ignore state_referenced_locally
  const initialMessages = direct ? DIRECT_MESSAGES : GROUP_MESSAGES;
  // svelte-ignore state_referenced_locally
  const members: MemberId[] = direct ? ['maya'] : ['maya', 'jordan', 'alex'];
  const initialReactions = new Map(
    initialMessages.map((item) => [item.id, new Set(item.reactions.map((r) => r.emoji))])
  );

  let draft = $state<ComposerValue>([]);
  let messages = $state<ChatMessage[]>(initialMessages);
  let replyTo = $state<number | null>(null);
  let replyFocus = $state.raw<ChatReplyFocusTarget | null>(null);
  let expandedMessages = $state<Record<number, boolean>>({});
  let typing = $state(false);
  let highlighted = $state<number | null>(null);
  let inputRef = $state<HTMLElement | null>(null);
  // Bubble elements by message id, used to anchor the reply preview.
  const bubbles: Record<number, HTMLDivElement | null> = {};
  const replyDismissal = { current: 'cancel' as 'cancel' | 'send' };

  let nextId = initialMessages.length + 1;
  let replyIndex = 0;
  let highlightTimer: number | undefined;
  let replyExitTimer: number | undefined;
  let cancelJump: (() => void) | undefined;
  const timers: number[] = [];

  const scroll = new ChatScroll(() => ({
    paused: replyFocus !== null,
    itemCount: messages.length,
    layoutKey: typing ? 'typing' : 'idle'
  }));

  const messagesById = $derived(new Map(messages.map((item) => [item.id, item])));
  const replyMessage = $derived(replyFocus ? messagesById.get(replyFocus.messageId) : undefined);

  onDestroy(() => {
    for (const timer of timers) clearTimeout(timer);
    cancelJump?.();
    clearTimeout(highlightTimer);
    clearTimeout(replyExitTimer);
  });

  // Once a reply preview has been dismissed, release the lifted message after the exit animation.
  $effect(() => {
    if (replyTo === null && replyFocus !== null) {
      window.clearTimeout(replyExitTimer);
      replyExitTimer = window.setTimeout(() => {
        replyFocus = null;
        if (replyDismissal.current === 'cancel') scroll.updatePosition();
      }, 380);
    }
  });

  function later(callback: () => void, delay: number) {
    timers.push(window.setTimeout(callback, delay));
  }

  function setStatus(id: number, status: Status) {
    messages = messages.map((item) => (item.id === id ? { ...item, delivery: status } : item));
  }

  let playbackMessageId: number | null = null;
  const playback = new ChatPreviewPlayback((step) => {
    if (step.type === 'draft') {
      draft = [{ type: 'text', text: step.text }];
    } else if (step.type === 'send') {
      const id = nextId++;
      playbackMessageId = id;
      scroll.atBottom = true;
      messages = [...messages, message(id, 'you', step.text, { delivery: 'sending' })];
      draft = [];
    } else if (step.type === 'reply') {
      typing = false;
      messages = [...messages, message(nextId++, 'maya', step.text)];
    } else if (playbackMessageId !== null) {
      setStatus(playbackMessageId, step.type === 'delivered' ? 'delivered' : 'read');
      if (step.type === 'typing') typing = true;
    }
  });

  function stopPlayback() {
    if (!playback.stop()) return;
    draft = [];
    typing = false;
    if (playbackMessageId !== null) setStatus(playbackMessageId, 'read');
  }

  function react(id: number, emoji: string) {
    messages = messages.map((item) =>
      item.id === id ? { ...item, reactions: toggleReaction(item.reactions, emoji) } : item
    );
  }

  function jumpTo(id: number) {
    const target = document.getElementById(`${previewId}-message-${id}`);
    if (!target) return;
    scroll.atBottom = false;
    cancelJump?.();
    window.clearTimeout(highlightTimer);
    highlighted = null;
    const timeline = scroll.viewport;
    const reveal = () => {
      cancelJump?.();
      highlighted = id;
      highlightTimer = window.setTimeout(() => (highlighted = null), 420);
    };
    const waitForScroll = () => {
      window.clearTimeout(highlightTimer);
      highlightTimer = window.setTimeout(reveal, 100);
    };
    timeline?.addEventListener('scroll', waitForScroll, { passive: true });
    cancelJump = () => {
      timeline?.removeEventListener('scroll', waitForScroll);
      window.clearTimeout(highlightTimer);
    };
    waitForScroll();
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center'
    });
    target.focus({ preventScroll: true });
  }

  function send(text: string) {
    const id = nextId++;
    scroll.atBottom = true;
    messages = [
      ...messages,
      message(id, 'you', text, { replyTo: replyTo ?? undefined, delivery: 'sending' })
    ];
    draft = [];
    replyDismissal.current = 'send';
    replyTo = null;
    later(() => setStatus(id, 'delivered'), 700);
    later(() => {
      setStatus(id, 'read');
      typing = true;
    }, 1400);
    later(() => {
      const replies = direct ? DIRECT_REPLIES : REPLIES;
      const reply = replies[replyIndex++ % replies.length] ?? '';
      typing = false;
      messages = [...messages, message(nextId++, 'maya', reply, { replyTo: id })];
    }, 3200);
  }

  function startReply(item: ChatMessage, grouped: boolean) {
    const source = bubbles[item.id];
    if (!source) return;
    cancelJump?.();
    highlighted = null;
    scroll.atBottom = false;
    replyDismissal.current = 'cancel';
    window.clearTimeout(replyExitTimer);
    replyFocus = {
      messageId: item.id,
      source,
      width: source.getBoundingClientRect().width,
      firstInGroup: !grouped,
      expanded: expandedMessages[item.id] ?? false
    };
    replyTo = item.id;
    inputRef?.focus({ preventScroll: true });
    const selection = window.getSelection();
    if (inputRef) {
      selection?.selectAllChildren(inputRef);
      selection?.collapseToEnd();
    }
  }

  function cancelReply() {
    replyDismissal.current = 'cancel';
    replyTo = null;
  }

  function attachment() {
    toastManager.add({
      title: 'Attachment preview',
      description: 'Attachments aren’t connected in this demo.'
    });
  }
</script>

<!-- Escape cancels a pending reply from anywhere inside the preview. -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
  bind:this={playback.element}
  onfocuscapture={(event) => {
    if (event.target === inputRef) stopPlayback();
  }}
  onkeydown={(event) => {
    if (event.key === 'Escape' && !event.defaultPrevented && replyTo !== null) {
      event.preventDefault();
      cancelReply();
    }
  }}
  aria-label={direct ? 'Direct message preview' : 'Live chat preview'}
  class="flex h-144 min-w-0 flex-col overflow-hidden rounded-2xl border bg-popover shadow-lg/5"
>
  <div class="flex shrink-0 items-center justify-between gap-4 px-4 py-3.5">
    <div class="flex items-center gap-3">
      {#if direct}
        <div class="relative flex shrink-0">
          <ChatDemoMemberAvatar member="maya" class="size-9" />
          <span
            aria-hidden="true"
            class="absolute end-0.5 bottom-0.5 size-2 rounded-full bg-success outline-2 outline-popover"
          ></span>
        </div>
      {/if}
      <div>
        <h2 class="text-sm font-medium">{direct ? 'Maya Chen' : 'Launch week'}</h2>
        <p class="mt-0.5 text-xs text-muted-foreground">
          {direct ? 'Online' : 'Maya, Jordan, Alex, and you'}
        </p>
      </div>
    </div>
    {#if direct}
      <Tooltip>
        <TooltipTrigger
          class={buttonVariants({ variant: 'ghost', size: 'icon-lg' })}
          aria-label="Call Maya"
          onclick={() =>
            toastManager.add({
              title: 'Voice call preview',
              description: 'Calls aren’t connected in this demo.'
            })}
        >
          <PhoneIcon aria-hidden="true" />
        </TooltipTrigger>
        <TooltipPopup>Call Maya</TooltipPopup>
      </Tooltip>
    {:else}
      <div class="flex -space-x-1.5">
        {#each members as member (member)}
          <ChatDemoMemberAvatar {member} class="size-6 ring-2 ring-popover" />
        {/each}
      </div>
    {/if}
  </div>
  <ChatConversation
    class="overflow-clip"
    {scroll}
    label="Preview messages"
    live={playback.active ? 'off' : undefined}
    jumpLabel="Jump to latest"
    inactive={replyFocus !== null}
  >
    {#snippet overlay()}
      {#if replyTo !== null && replyFocus && replyMessage}
        {#key replyMessage.id}
          <ChatDemoReplyFocus
            target={replyFocus}
            message={replyMessage}
            replyMessage={messagesById.get(replyMessage.replyTo ?? -1)}
            dismissalRef={replyDismissal}
            onCancel={cancelReply}
          />
        {/key}
      {/if}
    {/snippet}
    <div class="flex flex-col pt-4">
      {#each messages as item, index (item.id)}
        {@const own = item.author === 'you'}
        {@const previous = messages[index - 1]}
        {@const grouped = previous?.author === item.author}
        {@const groupEnd = messages[index + 1]?.author !== item.author}
        {@const name = CHAT_MEMBERS[item.author].name}
        {@const status = item.delivery as Status | undefined}
        {#snippet reactions()}
          {#each item.reactions as reaction (reaction.emoji)}
            {@const selected = reaction.members.includes('you')}
            {@const count = reaction.members.length}
            <ChatReactionChip
              animateEntrance={!initialReactions.get(item.id)?.has(reaction.emoji)}
              emoji={reaction.emoji}
              {count}
              {selected}
              label={`${selected ? 'Remove' : 'Add'} ${reaction.emoji} reaction, ${count} ${count === 1 ? 'person' : 'people'}`}
              reactorLabel={`${count} ${count === 1 ? 'reaction' : 'reactions'}`}
              popupAlign={own ? 'end' : 'start'}
              onclick={() => react(item.id, reaction.emoji)}
            >
              {#snippet reactorContent()}
                <ul
                  aria-label="People who reacted"
                  class="flex max-h-48 flex-col overflow-y-auto overscroll-contain"
                >
                  {#each reaction.members as reactor (reactor)}
                    <li class="flex items-center gap-2 px-1.5 py-1 text-xs leading-5">
                      <ChatDemoMemberAvatar member={reactor} class="size-5 text-[.5625rem]" />
                      <span class="min-w-0 flex-1 truncate">{CHAT_MEMBERS[reactor].name}</span>
                      {#if reactor === 'you'}
                        <Badge variant="secondary" size="sm">You</Badge>
                      {/if}
                    </li>
                  {/each}
                </ul>
              {/snippet}
            </ChatReactionChip>
          {/each}
        {/snippet}
        {#snippet footer()}
          <time>{item.time}</time>
          {#if status}
            <ChatDeliveryIndicator {status} label={STATUS_LABELS[status]} />
          {/if}
        {/snippet}
        <div class={cn(index > 0 && (grouped ? (previous?.delivery ? 'pt-3' : 'pt-1') : 'pt-5'))}>
          <ChatMessageView
            id={`${previewId}-message-${item.id}`}
            tabindex={-1}
            aria-label={`${name}, at ${item.time}`}
            {grouped}
            side={own ? 'outgoing' : 'incoming'}
            author={name}
            animateEntrance={item.id > initialMessages.length}
            highlighted={highlighted === item.id}
            lifted={replyFocus?.messageId === item.id}
            bind:bubbleRef={
              () => bubbles[item.id] ?? null, (element) => (bubbles[item.id] = element)
            }
            reactions={item.reactions.length > 0 ? reactions : undefined}
            footer={groupEnd || status ? footer : undefined}
          >
            {#snippet avatar()}
              <ChatDemoMemberAvatar member={item.author} />
            {/snippet}
            {#snippet actions()}
              <ChatMessageActionToolbar
                side={own ? 'outgoing' : 'incoming'}
                toolbarLabel="Message actions"
                replyLabel={`Reply to ${name}`}
                replyTooltip="Reply"
                onReply={() => startReply(item, grouped)}
              >
                {#snippet reactionPicker(toolbar)}
                  <ChatReactionPicker
                    options={CHAT_EMOJI}
                    selectedEmojis={item.reactions
                      .filter((reaction) => reaction.members.includes('you'))
                      .map((reaction) => reaction.emoji)}
                    triggerLabel="React to message"
                    triggerTooltip="React"
                    popupLabel="Choose a reaction"
                    popupAlign={own ? 'start' : 'end'}
                    popupAnchor={toolbar}
                    onSelect={(emoji) => react(item.id, emoji)}
                  />
                {/snippet}
              </ChatMessageActionToolbar>
            {/snippet}
            <ChatDemoMessageBody
              message={item}
              replyMessage={messagesById.get(item.replyTo ?? -1)}
              onJump={jumpTo}
              open={expandedMessages[item.id] ?? false}
              onOpenChange={(next) => (expandedMessages[item.id] = next)}
            />
          </ChatMessageView>
        </div>
      {/each}
      <ChatTypingIndicator visible={typing} label="Maya is typing" class="pt-4" />
    </div>
  </ChatConversation>
  <ChatDemoComposer
    class="[&_[data-slot=composer]]:[--composer-min-rows:1] md:[&_[data-slot=composer]]:[--composer-radius:--spacing(6)]"
    showKeyboardHint={false}
    bind:value={draft}
    bind:inputRef
    mentionMembers={members}
    placeholder={direct ? 'Message Maya…' : 'Message the group…'}
    replyAuthor={replyTo !== null && replyMessage
      ? CHAT_MEMBERS[replyMessage.author].name
      : undefined}
    notice=""
    onSend={() => {
      const text = getComposerText(draft).trim();
      if (text) send(text);
    }}
  >
    {#snippet startAction()}
      <Tooltip>
        <TooltipTrigger
          class={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'rounded-full before:rounded-full'
          )}
          aria-label="Add attachment"
          onclick={attachment}
        >
          <PlusIcon aria-hidden="true" />
        </TooltipTrigger>
        <TooltipPopup>Add attachment</TooltipPopup>
      </Tooltip>
    {/snippet}
  </ChatDemoComposer>
</section>
