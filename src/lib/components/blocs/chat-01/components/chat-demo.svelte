<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import LockIcon from '@lucide/svelte/icons/lock';
  import LogOutIcon from '@lucide/svelte/icons/log-out';
  import PinIcon from '@lucide/svelte/icons/pin';
  import { onDestroy, type Snippet, tick } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle
  } from '#lib/components/ui/alert-dialog/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    ChatConversation,
    ChatDatePill,
    ChatScroll,
    ChatStatusBar,
    ChatTypingIndicator,
    ChatUnreadDivider
  } from '#lib/components/ui/chat/index.js';
  import { type ComposerValue, getComposerText } from '#lib/components/ui/composer/index.js';
  import {
    Drawer,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger
  } from '#lib/components/ui/drawer/index.js';
  import { TooltipProvider } from '#lib/components/ui/tooltip/index.js';
  import { cn } from '#lib/utils.js';
  import ChatDemoComposer from './chat-demo-composer.svelte';
  import ChatDemoGroupDetails from './chat-demo-group-details.svelte';
  import ChatDemoMessageInfo from './chat-demo-message-info.svelte';
  import ChatDemoMessage from './chat-demo-message.svelte';
  import { getMessageReceipts } from './chat-demo-receipts';
  import ChatDemoReplyFocus, { type ChatReplyFocusTarget } from './chat-demo-reply-focus.svelte';
  import {
    CHAT_MEMBERS,
    CHAT_SCENARIOS,
    type ChatMessage,
    type ChatScenario,
    deleteChatMessage,
    getMessageDeletionReason,
    getMessagePreview,
    getScenarioMessages,
    getTypingLabel,
    INITIAL_CHAT_MESSAGES,
    type MemberId,
    OTHER_MEMBERS,
    toggleReaction
  } from './chat-demo-state';
  import ChatDemoTimelineState from './chat-demo-timeline-state.svelte';

  const DEMO_REPLIES = [
    'Thanks for sharing! I’ll take a look ✨',
    'Love that. Let’s pick it up in the walkthrough.',
    'Noted — I’ll bring this back to the group.'
  ];

  let {
    triggers
  }: {
    /** Renders the drawer triggers; receives `select` to open the drawer on a scenario. */
    triggers?: Snippet<[select: (scenario: ChatScenario) => void]>;
  } = $props();

  const id = $props.id();
  const isDesktop = new MediaQuery('min-width: 768px');
  const position = $derived(isDesktop.current ? 'right' : 'bottom');

  let infoOpen = $state(false);
  let membersOpen = $state(false);
  let infoMessageId = $state<number | null>(null);
  let deleteMessageId = $state<number | null>(null);
  let deleteOpen = $state(false);
  let scenario = $state<ChatScenario>('conversation');
  let joinedChat = $state(false);
  let unreadCount = $state(0);
  let unreadFrom = $state<number | null>(null);
  let open = $state(false);
  let messages = $state.raw<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  let enteringMessageIds = $state<number[]>([]);
  let draftValue = $state.raw<ComposerValue>([]);
  const draft = $derived(getComposerText(draftValue));
  let replyTo = $state<number | null>(null);
  let replyFocus = $state.raw<ChatReplyFocusTarget | null>(null);
  const replyDismissal = { current: 'cancel' as 'cancel' | 'send' };
  let pinnedId = $state<number | null>(null);
  let typingMembers = $state<MemberId[]>([]);
  let mutedMembers = $state<MemberId[]>([]);
  let members = $state<MemberId[]>([...OTHER_MEMBERS, 'you']);
  let bannedMembers = $state<MemberId[]>([]);
  let notice = $state('');
  let highlightedId = $state<number | null>(null);
  let composerElement = $state<HTMLElement | null>(null);
  let infoReturnFocus: HTMLElement | null = null;
  let deleteReturnFocus: HTMLElement | null = null;
  let focusComposerAfterRestore = false;

  const scroll = new ChatScroll(() => ({
    active: open,
    paused: infoOpen || membersOpen || deleteOpen || replyFocus !== null,
    itemCount: messages.length,
    layoutKey: `${typingMembers.length}-${scenario}`,
    onReachEnd: () => (unreadCount = 0)
  }));

  let nextId = 30;
  let replyIndex = 0;
  let retryTimer: number | undefined;
  let reconnectTimer: number | undefined;
  let replyTimer: number | undefined;
  let noticeTimer: number | undefined;
  let highlightTimer: number | undefined;
  let replyExitTimer: number | undefined;
  let cancelJump: (() => void) | undefined;

  const messagesById = $derived(new Map(messages.map((message) => [message.id, message])));
  const dateGroups = $derived(
    messages.reduce<{ dateLabel: string; entries: { message: ChatMessage; index: number }[] }[]>(
      (groups, message, index) => {
        const current = groups.at(-1);
        if (current?.dateLabel === message.dateLabel) current.entries.push({ message, index });
        else groups.push({ dateLabel: message.dateLabel, entries: [{ message, index }] });
        return groups;
      },
      []
    )
  );
  const infoMessage = $derived(
    infoMessageId === null ? undefined : messagesById.get(infoMessageId)
  );
  const replyMessage = $derived(replyTo === null ? undefined : messagesById.get(replyTo));
  const pinnedMessage = $derived(pinnedId === null ? undefined : messagesById.get(pinnedId));
  const activeOtherMembers = $derived(members.filter((member) => member !== 'you'));
  const composerDisabled = $derived(
    [
      'loading',
      'error',
      'offline',
      'reconnecting',
      'access-lost',
      'removed',
      'banned',
      'left'
    ].includes(scenario)
  );
  const showComposer = $derived(
    !['removed', 'banned', 'left', 'error', 'access-lost'].includes(scenario) &&
      (scenario !== 'empty' || joinedChat)
  );

  // `focus()` on a contenteditable puts the caret at the start of an existing draft.
  function focusAtEnd(input: HTMLElement | null) {
    if (!input) return;
    input.focus({ preventScroll: true });
    const selection = window.getSelection();
    selection?.selectAllChildren(input);
    selection?.collapseToEnd();
  }

  $effect(() => {
    if (open && scenario === 'empty' && joinedChat) focusAtEnd(composerElement);
    if (open && scenario === 'conversation' && focusComposerAfterRestore) {
      focusComposerAfterRestore = false;
      focusAtEnd(composerElement);
    }
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

  onDestroy(() => {
    for (const timer of [
      replyTimer,
      retryTimer,
      reconnectTimer,
      noticeTimer,
      highlightTimer,
      replyExitTimer
    ])
      clearTimeout(timer);
    cancelJump?.();
  });

  function announce(text: string) {
    notice = text;
    window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => (notice = ''), 3000);
  }

  function openMessageInfo(messageId: number, trigger: HTMLElement | null) {
    infoReturnFocus = trigger;
    scroll.atBottom = false;
    infoMessageId = messageId;
    infoOpen = true;
  }

  function changeScenario(next: ChatScenario) {
    for (const timer of [
      replyTimer,
      retryTimer,
      reconnectTimer,
      noticeTimer,
      highlightTimer,
      replyExitTimer
    ])
      window.clearTimeout(timer);
    cancelJump?.();
    infoOpen = false;
    membersOpen = false;
    infoMessageId = null;
    deleteOpen = false;
    deleteMessageId = null;
    scenario = next;
    joinedChat = false;
    messages = getScenarioMessages(next);
    enteringMessageIds = [];
    typingMembers =
      next === 'typing'
        ? activeOtherMembers.filter((member) => member === 'maya')
        : next === 'typing-multiple'
          ? [...activeOtherMembers]
          : [];
    replyTo = null;
    replyFocus = null;
    highlightedId = null;
    notice = '';
    pinnedId = next === 'pinned' ? 5 : null;
    nextId = 30;
    unreadCount = next === 'unread' ? 3 : 0;
    unreadFrom = next === 'unread' ? 5 : null;
    scroll.resetScroll(next !== 'unread');
  }

  function retryMessage(messageId: number) {
    messages = messages.map((message) =>
      message.id === messageId ? { ...message, delivery: 'sending' } : message
    );
    window.clearTimeout(retryTimer);
    retryTimer = window.setTimeout(() => {
      messages = messages.map((message) =>
        message.id === messageId
          ? { ...message, delivery: 'delivered', receipts: undefined }
          : message
      );
      announce('Message delivered');
    }, 1200);
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text || composerDisabled) return;
    if (scenario === 'empty' || scenario === 'typing' || scenario === 'typing-multiple')
      scenario = 'conversation';
    const time = new Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).format(new Date());
    const message: ChatMessage = {
      id: nextId++,
      author: 'you',
      text,
      dateLabel: 'Today',
      time,
      replyTo: replyTo ?? undefined,
      reactions: []
    };
    scroll.atBottom = true;
    enteringMessageIds = [...enteringMessageIds, message.id];
    messages = [...messages, message];
    draftValue = [];
    replyDismissal.current = 'send';
    replyTo = null;
    typingMembers = ['maya'];
    window.clearTimeout(replyTimer);
    replyTimer = window.setTimeout(() => {
      const response: ChatMessage = {
        id: nextId++,
        author: 'maya',
        text: DEMO_REPLIES[replyIndex++ % DEMO_REPLIES.length] ?? 'Thanks for sharing!',
        dateLabel: 'Today',
        time,
        reactions: []
      };
      if (!scroll.atBottom) {
        unreadCount += 1;
        unreadFrom = unreadFrom ?? response.id;
      }
      if (scroll.viewport && scroll.atBottom)
        enteringMessageIds = [...enteringMessageIds, response.id];
      messages = [
        ...messages.map((item) =>
          item.author === 'you' && item.delivery !== 'failed' && item.delivery !== 'sending'
            ? { ...item, delivery: 'read' as const, receipts: undefined }
            : item
        ),
        response
      ];
      typingMembers = [];
    }, 1800);
  }

  function onReply(
    messageId: number,
    source: HTMLElement,
    firstInGroup: boolean,
    expanded: boolean
  ) {
    cancelJump?.();
    highlightedId = null;
    scroll.atBottom = false;
    replyDismissal.current = 'cancel';
    window.clearTimeout(replyExitTimer);
    replyFocus = {
      messageId,
      source,
      width: source.getBoundingClientRect().width,
      firstInGroup,
      expanded
    };
    replyTo = messageId;
    focusAtEnd(composerElement);
  }

  function cancelReply() {
    replyDismissal.current = 'cancel';
    replyTo = null;
  }

  function onReact(messageId: number, emoji: string) {
    messages = messages.map((message) =>
      message.id === messageId
        ? { ...message, reactions: toggleReaction(message.reactions, emoji) }
        : message
    );
  }

  function requestDelete(messageId: number, trigger: HTMLElement | null) {
    const message = messagesById.get(messageId);
    if (!message || !getMessageDeletionReason(message)) return;
    deleteReturnFocus = trigger;
    deleteMessageId = messageId;
    deleteOpen = true;
  }

  function confirmDelete() {
    if (deleteMessageId === null) return;
    const target = messagesById.get(deleteMessageId);
    if (!target || !getMessageDeletionReason(target)) return;
    const targetId = deleteMessageId;
    messages = messages.map((message) =>
      message.id === targetId ? deleteChatMessage(message) : message
    );
    if (pinnedId === targetId) pinnedId = null;
    if (replyTo === targetId) replyTo = null;
    announce(getMessagePreview(deleteChatMessage(target)));
  }

  async function onCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      announce('Message copied');
    } catch {
      announce('Couldn’t copy. Select the message text to copy it.');
    }
  }

  function removeMember(member: MemberId) {
    const remaining = activeOtherMembers;
    members = members.filter((item) => item !== member);
    typingMembers = typingMembers.filter((item) => item !== member);
    messages = messages.map((message) => ({
      ...message,
      receipts: getMessageReceipts(message, remaining).filter(
        (receipt) => receipt.member !== member
      )
    }));
  }

  function onPin(messageId: number) {
    const wasPinned = pinnedId === messageId;
    pinnedId = wasPinned ? null : messageId;
    announce(wasPinned ? 'Message unpinned' : 'Message pinned');
  }

  function onJump(messageId: number) {
    const target = document.getElementById(`${id}-message-${messageId}`);
    if (!target) return;
    scroll.atBottom = false;
    cancelJump?.();
    window.clearTimeout(highlightTimer);
    highlightedId = null;
    const timeline = scroll.viewport;
    const reveal = () => {
      cancelJump?.();
      highlightedId = messageId;
      highlightTimer = window.setTimeout(() => (highlightedId = null), 420);
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
      block: 'center',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
    target.focus({ preventScroll: true });
  }

  function onOpenChange(next: boolean) {
    enteringMessageIds = [];
    if (!next) {
      cancelJump?.();
      highlightedId = null;
      infoOpen = false;
      membersOpen = false;
    }
  }

  function reconnect() {
    scenario = 'reconnecting';
    window.clearTimeout(reconnectTimer);
    reconnectTimer = window.setTimeout(() => {
      focusComposerAfterRestore = true;
      scenario = 'conversation';
      announce('Connected');
    }, 1200);
  }

  // Escape cancels an active reply before it closes the drawer.
  function onWindowKeydown(event: KeyboardEvent) {
    if (open && event.key === 'Escape' && replyTo !== null) {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancelReply();
    }
  }

  const unreadLabel = $derived(
    unreadCount
      ? `${unreadCount} new ${unreadCount === 1 ? 'message' : 'messages'}`
      : 'Jump to latest'
  );
</script>

<svelte:window onkeydowncapture={onWindowKeydown} />

<TooltipProvider delay={300}>
  <Drawer
    {position}
    bind:open
    onOpenChangeComplete={(isOpen) => {
      if (isOpen) return;
      replyTo = null;
      replyFocus = null;
    }}
    {onOpenChange}
  >
    {#if triggers}
      {@render triggers(changeScenario)}
    {:else}
      <div class="flex max-w-xl flex-wrap justify-center gap-2">
        {#each CHAT_SCENARIOS as item (item.value)}
          <DrawerTrigger
            class={buttonVariants({ variant: 'outline', size: 'sm' })}
            onclick={() => changeScenario(item.value)}
          >
            {item.label}
          </DrawerTrigger>
        {/each}
      </div>
    {/if}
    <DrawerPopup
      variant="inset"
      showCloseButton
      class={position === 'bottom'
        ? 'pb-[max(var(--drawer-keyboard-inset,0px),env(safe-area-inset-bottom,0px))] [--drawer-height:100dvh]'
        : undefined}
    >
      <DrawerHeader>
        <DrawerTitle>The studio</DrawerTitle>
        <DrawerDescription>
          {#if scenario === 'removed'}
            You were removed from this chat
          {:else if scenario === 'banned'}
            You were banned from this chat
          {:else if scenario === 'left'}
            You left this chat
          {:else}
            <ChatDemoGroupDetails
              bind:open={membersOpen}
              onClosed={scroll.updatePosition}
              {position}
              activeMembers={members}
              {mutedMembers}
              {bannedMembers}
              onToggleMute={(member) =>
                (mutedMembers = mutedMembers.includes(member)
                  ? mutedMembers.filter((item) => item !== member)
                  : [...mutedMembers, member])}
              onRemove={removeMember}
              onBan={(member) => {
                bannedMembers = [...bannedMembers, member];
                removeMember(member);
              }}
              onUnban={(member) => {
                bannedMembers = bannedMembers.filter((item) => item !== member);
                if (!members.includes(member)) members = [...members, member];
              }}
              canLeave={scenario !== 'access-lost'}
              onLeave={() => {
                changeScenario('left');
                draftValue = [];
              }}
              conversationFocus={() => scroll.viewport}
            />
          {/if}
        </DrawerDescription>
      </DrawerHeader>
      {#if pinnedMessage && !pinnedMessage.deletedReason}
        <Button
          variant="ghost"
          class="h-auto shrink-0 justify-start gap-3 rounded-none border-border/60 border-x-0 border-y bg-muted/72 px-5 py-2.5 text-start sm:h-auto"
          onclick={() => onJump(pinnedMessage.id)}
          aria-label="Jump to pinned message"
        >
          <PinIcon aria-hidden="true" class="size-3.5 text-muted-foreground" />
          <span class="flex min-w-0 flex-1 flex-col gap-0.5">
            <span class="font-medium text-[.625rem] text-muted-foreground">Pinned message</span>
            <span class="truncate font-normal text-xs">{pinnedMessage.text}</span>
          </span>
          <ChevronRightIcon aria-hidden="true" class="size-3 text-muted-foreground" />
        </Button>
      {/if}
      {#if scenario === 'offline' || scenario === 'reconnecting'}
        <ChatStatusBar
          title={scenario === 'offline' ? 'You’re offline' : 'Reconnecting…'}
          description="Your draft is saved here. Sending will resume when connected."
        >
          {#snippet action()}
            <Button
              variant="outline"
              size="xs"
              loading={scenario === 'reconnecting'}
              onclick={reconnect}
            >
              Reconnect
            </Button>
          {/snippet}
        </ChatStatusBar>
      {/if}
      <DrawerPanel
        scrollable={false}
        class="relative flex min-h-0 flex-1 flex-col overflow-clip p-0 pt-0!"
      >
        <ChatConversation
          {scroll}
          label="Conversation messages"
          inactive={replyFocus !== null}
          jumpLabel={unreadLabel}
          contentClass={cn(
            ['empty', 'error', 'access-lost', 'removed', 'banned', 'left'].includes(scenario) &&
              'flex min-h-full flex-col',
            (scenario === 'removed' || scenario === 'banned' || scenario === 'left') &&
              'justify-center'
          )}
        >
          {#snippet overlay()}
            {#if replyMessage && replyFocus}
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
          <ChatDemoTimelineState
            {scenario}
            onRecover={() => {
              if (scenario === 'left' || scenario === 'removed') focusComposerAfterRestore = true;
              changeScenario('conversation');
            }}
            memberCount={activeOtherMembers.length}
            joined={joinedChat}
            onJoin={() => (joinedChat = true)}
          />
          <div>
            {#each dateGroups as group (group.entries[0]?.message.id)}
              <div class="not-first:mt-4 flex flex-col gap-4 first:pt-4">
                {#if group.dateLabel}
                  <ChatDatePill>{group.dateLabel}</ChatDatePill>
                {/if}
                <div class="flex flex-col">
                  {#each group.entries as { message, index }, entryIndex (message.id)}
                    {@const previousMessage = messages[index - 1]}
                    {@const nextMessage = messages[index + 1]}
                    {@const grouped =
                      previousMessage?.author === message.author &&
                      previousMessage.dateLabel === message.dateLabel &&
                      !message.deletedReason &&
                      !previousMessage.deletedReason}
                    {@const followsSeparator = entryIndex === 0 || message.id === unreadFrom}
                    {#if message.id === unreadFrom}
                      <ChatUnreadDivider class="first:mt-0">New messages</ChatUnreadDivider>
                    {/if}
                    <div
                      class={cn(
                        !followsSeparator &&
                          (grouped ? (previousMessage?.delivery ? 'pt-3' : 'pt-1') : 'pt-5')
                      )}
                    >
                      <ChatDemoMessage
                        {message}
                        recipients={activeOtherMembers}
                        entering={enteringMessageIds.includes(message.id)}
                        onEntranceEnd={() =>
                          (enteringMessageIds = enteringMessageIds.filter(
                            (item) => item !== message.id
                          ))}
                        replyMessage={messagesById.get(message.replyTo ?? -1)}
                        {grouped}
                        groupEnd={nextMessage?.author !== message.author ||
                          nextMessage?.dateLabel !== message.dateLabel ||
                          Boolean(message.deletedReason || nextMessage?.deletedReason)}
                        pinned={pinnedId === message.id}
                        highlighted={highlightedId === message.id}
                        replyLifted={replyFocus?.messageId === message.id}
                        domId={`${id}-message-${message.id}`}
                        {onReply}
                        {onReact}
                        {onPin}
                        onDelete={requestDelete}
                        {onCopy}
                        {onJump}
                        onRetry={retryMessage}
                        onInfo={openMessageInfo}
                      />
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
          <ChatTypingIndicator
            visible={typingMembers.length > 0}
            label={getTypingLabel(typingMembers)}
            class="ps-9 pt-5"
          />
        </ChatConversation>
      </DrawerPanel>
      {#if scenario === 'empty' && !joinedChat}
        <DrawerFooter
          variant="bare"
          class="items-center text-muted-foreground text-xs sm:justify-center"
        >
          <div class="flex flex-col gap-1.5">
            <span class="flex items-start gap-2">
              <LockIcon aria-hidden="true" class="mt-0.5 size-3.5 shrink-0" />
              Only members can see this chat and who’s in it.
            </span>
            <span class="flex items-start gap-2">
              <LogOutIcon aria-hidden="true" class="mt-0.5 size-3.5 shrink-0" />
              Leave any time — your ticket stays valid.
            </span>
          </div>
        </DrawerFooter>
      {/if}
      {#if showComposer}
        <ChatDemoComposer
          bind:value={draftValue}
          replyAuthor={replyMessage ? CHAT_MEMBERS[replyMessage.author].name : undefined}
          mentionMembers={activeOtherMembers}
          onSend={sendMessage}
          bind:inputRef={composerElement}
          {notice}
          disabled={composerDisabled}
        />
      {/if}
      <ChatDemoMessageInfo
        message={infoMessage}
        recipients={activeOtherMembers}
        replyMessage={messagesById.get(infoMessage?.replyTo ?? -1)}
        {position}
        bind:open={infoOpen}
        onClosed={scroll.updatePosition}
        returnFocus={() => infoReturnFocus}
      />
      <AlertDialog bind:open={deleteOpen}>
        <AlertDialogPopup
          finalFocus={() =>
            deleteReturnFocus?.isConnected
              ? deleteReturnFocus
              : (document.getElementById(`${id}-message-${deleteMessageId}`) ?? scroll.viewport)}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This message will be deleted for everyone. This can’t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
            <AlertDialogClose
              class={buttonVariants({ variant: 'destructive' })}
              onclick={confirmDelete}
            >
              Delete message
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </DrawerPopup>
  </Drawer>
</TooltipProvider>
