<script lang="ts">
  import Check from '@lucide/svelte/icons/check';
  import CircleCheck from '@lucide/svelte/icons/circle-check';
  import Feather from '@lucide/svelte/icons/feather';
  import Share2 from '@lucide/svelte/icons/share-2';
  import { Avatar, AvatarFallback, AvatarGroup } from '#lib/components/ui/avatar/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    createEditor,
    RichEditor,
    type JSONContent
  } from '#lib/components/ui/rich-editor/index.ts';

  const listItem = (title: string, detail: string): JSONContent => ({
    type: 'listItem',
    content: [
      {
        type: 'paragraph',
        content: [
          { type: 'text', marks: [{ type: 'bold' }], text: title },
          { type: 'text', text: ` — ${detail}` }
        ]
      }
    ]
  });

  const taskItem = (checked: boolean, text: string): JSONContent => ({
    type: 'taskItem',
    attrs: { checked },
    content: [{ type: 'paragraph', content: [{ type: 'text', text }] }]
  });

  const initialContent: JSONContent = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'A calmer way to ship' }]
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'A living brief for teams building software that feels '
          },
          {
            type: 'text',
            marks: [{ type: 'italic' }],
            text: 'quiet, focused, and human'
          },
          { type: 'text', text: '.' }
        ]
      },
      {
        type: 'callout',
        attrs: { emoji: '💡' },
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', marks: [{ type: 'bold' }], text: 'North star. ' },
              {
                type: 'text',
                text: 'Make the next action obvious, then get out of the way.'
              }
            ]
          }
        ]
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'What we’re optimizing for' }]
      },
      {
        type: 'bulletList',
        content: [
          listItem('Reduce friction', 'every extra choice is a place to get lost.'),
          listItem('Earn attention', 'show up with context, not more noise.'),
          listItem('Feel human', 'warm details make complex work feel lighter.')
        ]
      },
      {
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'The best interfaces don’t announce themselves. They make the next step feel inevitable.'
              }
            ]
          }
        ]
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Launch checklist' }]
      },
      {
        type: 'taskList',
        content: [
          taskItem(true, 'Pressure-test the empty states'),
          taskItem(true, 'Write the first-run copy'),
          taskItem(false, 'Record a 30-second walkthrough'),
          taskItem(false, 'Ship the private beta')
        ]
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Implementation note' }]
      },
      {
        type: 'codeBlock',
        attrs: { language: 'ts' },
        content: [
          {
            type: 'text',
            text: "const calm = (ui: Interface) =>\n  ui.remove('noise').keep('signal');"
          }
        ]
      }
    ]
  };

  let words = $state(0);
  let characters = $state(0);
  const readingTime = $derived(Math.max(1, Math.ceil(words / 200)));

  function syncStats() {
    if (!editor) return;
    const text = editor.getText().trim();
    words = text ? text.split(/\s+/).length : 0;
    characters = text.length;
  }

  /**
   * [OPTIONAL] Use this function so perform something when content is updated.
   * May be save the content somewhere. You can define your own logic here.
   */
  const onUpdate = () => {
    syncStats();
  };

  const editor = createEditor({
    onUpdate
  });

  // Seed the demo with a document that shows off the editor's formatting.
  if (editor) {
    editor.commands.setContent(initialContent, { emitUpdate: false });
    syncStats();
  }
</script>

<RichEditor {editor}>
  <div class="w-full max-w-4xl">
    <div
      class="flex h-130 flex-col overflow-hidden rounded-2xl border bg-card shadow-[0_18px_40px_-30px_rgba(0,0,0,0.45)] sm:h-[560px]"
    >
      <header
        class="flex shrink-0 items-center justify-between gap-4 border-b bg-muted/20 px-4 py-3 sm:px-5"
      >
        <div class="flex min-w-0 items-center gap-3">
          <div
            class="grid size-9 shrink-0 place-items-center rounded-xl border bg-background text-primary"
          >
            <Feather class="size-4" />
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <h1 class="truncate font-medium text-sm">Product brief</h1>
              <Badge size="sm" variant="secondary">Draft</Badge>
            </div>
            <p class="truncate text-muted-foreground text-xs">
              Last edited just now · {readingTime} min read
            </p>
          </div>
        </div>

        <div class="flex shrink-0 items-center gap-2">
          <AvatarGroup class="hidden sm:flex">
            <Avatar class="size-7">
              <AvatarFallback class="bg-info/10 text-[10px] text-info-foreground">AM</AvatarFallback
              >
            </Avatar>
            <Avatar class="size-7">
              <AvatarFallback class="bg-warning/10 text-[10px] text-warning-foreground"
                >JK</AvatarFallback
              >
            </Avatar>
            <Avatar class="size-7">
              <AvatarFallback class="bg-success/10 text-[10px] text-success-foreground"
                >SR</AvatarFallback
              >
            </Avatar>
          </AvatarGroup>

          <Button class="hidden sm:inline-flex" size="sm" variant="outline">
            <Share2 />
            Share
          </Button>
          <Button size="sm">
            <Check />
            Done
          </Button>
        </div>
      </header>

      <div class="shrink-0 border-b bg-background/80">
        <RichEditor.Toolbar
          class="scrollbar-none w-full! max-w-full! gap-0.5 overflow-x-auto px-2 py-1.5"
        />
      </div>

      <div class="rich-editor-surface min-h-0 flex-1 overflow-y-auto">
        <RichEditor.Content class="px-4 py-5 sm:px-8 sm:py-6 *:outline-none" />
      </div>

      <footer
        class="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t bg-muted/20 px-4 py-2 text-[11px] text-muted-foreground sm:px-5"
      >
        <div class="flex items-center gap-3">
          <span>{words} words</span>
          <span class="size-1 rounded-full bg-border"></span>
          <span>{characters} characters</span>
        </div>
        <div class="flex items-center gap-1.5 text-success-foreground">
          <CircleCheck class="size-3.5" />
          <span>All changes saved</span>
        </div>
      </footer>

      <RichEditor.BubbleMenu />
      <RichEditor.DragHandle />
    </div>
  </div>
</RichEditor>

<style>
  .rich-editor-surface {
    scrollbar-color: var(--color-border) transparent;
    scrollbar-width: thin;
  }

  :global(.rich-editor-surface .tiptap) {
    max-width: 44rem;
    min-height: 100%;
    padding-bottom: 1rem;
    margin-inline: auto;
    font-size: 0.9375rem;
    line-height: 1.75;
  }

  :global(.rich-editor-surface .tiptap h1) {
    margin-top: 0;
    letter-spacing: -0.035em;
  }

  :global(.rich-editor-surface .tiptap h2) {
    margin-top: 1.75rem;
    font-size: 1.125rem;
    letter-spacing: -0.015em;
  }

  :global(.rich-editor-surface .tiptap p) {
    color: color-mix(in oklab, var(--color-foreground) 86%, transparent);
  }

  :global(.rich-editor-surface .tiptap strong) {
    color: var(--color-foreground);
  }

  :global(.rich-editor-surface .tiptap li::marker) {
    color: var(--color-muted-foreground);
  }
</style>
