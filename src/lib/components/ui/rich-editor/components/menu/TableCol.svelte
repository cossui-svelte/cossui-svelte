<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowLeftFromLine from '@lucide/svelte/icons/arrow-left-from-line';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import ArrowRightFromLine from '@lucide/svelte/icons/arrow-right-from-line';
  import Sheet from '@lucide/svelte/icons/sheet';
  import Trash from '@lucide/svelte/icons/trash';
  import { Separator } from '#lib/components/ui/separator/index.js';
  import { BubbleMenu, getEditor } from '../../tiptap';
  import { isColumnGripSelected, moveColumnLeft, moveColumnRight } from '../../tiptap/extensions';
  const editor = getEditor();
</script>

<BubbleMenu
  {editor}
  pluginKey="table-col-menu"
  shouldShow={(props) => {
    const { editor: propsEditor, state, view, from } = props;
    if (!propsEditor || !propsEditor.isEditable) return false;
    if (!state) return false;
    return isColumnGripSelected({ editor: propsEditor, view, state, from });
  }}
  options={{
    shift: true,
    autoPlacement: {
      allowedPlacements: ['top', 'bottom']
    },
    strategy: 'absolute',
    scrollTarget: editor.view.dom.parentElement ?? window
  }}
  class="z-50 flex h-fit w-fit flex-col gap-1 rounded-lg border bg-popover! p-2"
>
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Header column"
    onclick={() => editor.chain().focus().toggleHeaderColumn().run()}
  >
    <Sheet />
    Header column
  </button>
  <Separator />
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Add column after"
    onclick={() => editor.chain().focus().addColumnAfter().run()}
  >
    <ArrowRightFromLine />
    Add column after
  </button>
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Add column before"
    onclick={() => editor.chain().focus().addColumnBefore().run()}
  >
    <ArrowLeftFromLine />
    Add column before
  </button>
  <Separator />
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Move column left"
    onclick={() => editor.view.dispatch(moveColumnLeft(editor.state.tr))}
  >
    <ArrowLeft />
    Move column left
  </button>
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Move column right"
    onclick={() => editor.view.dispatch(moveColumnRight(editor.state.tr))}
  >
    <ArrowRight />
    Move column right
  </button>
  <Separator />
  <button
    class="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:hover:text-destructive dark:data-[variant=destructive]:hover:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!"
    title="Delete column"
    data-variant="destructive"
    onclick={() => editor.chain().focus().deleteColumn().run()}
  >
    <Trash />
    Delete column
  </button>
</BubbleMenu>
