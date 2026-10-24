<script lang="ts">
  import { Braces, TextAlignCenter } from '@lucide/svelte';
  import Clipboard from '@lucide/svelte/icons/clipboard';
  import Duplicate from '@lucide/svelte/icons/copy';
  import GripVertical from '@lucide/svelte/icons/grip-vertical';
  import Palette from '@lucide/svelte/icons/palette';
  import Plus from '@lucide/svelte/icons/plus';
  import RemoveFormatting from '@lucide/svelte/icons/remove-formatting';
  import Repeat2 from '@lucide/svelte/icons/repeat-2';
  import Delete from '@lucide/svelte/icons/trash-2';
  import type { Node } from '@tiptap/pm/model';
  import { NodeSelection } from '@tiptap/pm/state';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuShortcut,
    MenuSub,
    MenuSubPopup,
    MenuSubTrigger,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { cn } from '#lib/utils.js';
  import { commands, type Command } from '../commands';
  import { quickcolors } from '../helpers.ts';
  import { getEditor } from '../tiptap';
  import DragHandle from './DragHandle.svelte';

  interface Props {
    class?: string;
  }
  const { class: className }: Props = $props();

  const alignments = commands.alignment;
  const turnIntos: Record<string, Command[]> = Object.entries(commands).reduce(
    (acc, [key, value]) => {
      if (key === 'alignment') return acc;
      const turnIntoCommands = value.filter((c) => c.turnInto);
      if (turnIntoCommands.length > 0) {
        acc[key] = turnIntoCommands;
      }
      return acc;
    },
    {} as Record<string, Command[]>
  );

  let currentNode: Node | null = $state(null);
  let currentNodePos = $state(-1);
  let element = $state<HTMLElement | null>(null);
  let open = $state(false);

  const editor = getEditor();

  const handleRemoveFormatting = () => {
    const chain = editor.chain();
    chain.setNodeSelection(currentNodePos).unsetAllMarks();
    chain.setParagraph();
    chain.run();
  };

  const handleDuplicate = () => {
    editor.commands.setNodeSelection(currentNodePos);
    const selectedNode =
      editor.state.selection.$anchor.node(1) || (editor.state.selection as NodeSelection).node;
    editor
      .chain()
      .setMeta('hideDragHandle', true)
      .insertContentAt(currentNodePos + (currentNode?.nodeSize || 0), selectedNode.toJSON())
      .run();
  };

  const handleCopyToClipboard = () => {
    editor.chain().setMeta('hideDragHandle', true).setNodeSelection(currentNodePos).run();
    /**
     * !FIXME: document.execCommand is deprecated, use navigator.clipboard.writeText instead
     */
    document.execCommand('copy');
  };

  const handleCopyContentAs = (as: 'markdown' | 'json') => {
    let data = '';
    const nodeData = currentNode?.toJSON();
    if (as === 'markdown') {
      data = editor.markdown?.serialize(nodeData) || '';
    } else if (as === 'json') {
      data = JSON.stringify(nodeData, null, 2) || '';
    }
    if (data) {
      navigator.clipboard.writeText(data);
    }
  };

  const handleDelete = () => {
    editor
      .chain()
      .setMeta('hideDragHandle', true)
      .setNodeSelection(currentNodePos)
      .deleteSelection()
      .run();
  };

  const insertNode = () => {
    if (currentNodePos === -1) return;
    const currentNodeSize = currentNode?.nodeSize || 0;
    const insertPos = currentNodePos + currentNodeSize;
    const currentNodeIsEmptyParagraph =
      currentNode?.type.name === 'paragraph' && currentNode?.content?.size === 0;
    const focusPos = currentNodeIsEmptyParagraph ? currentNodePos + 2 : insertPos + 2;
    editor
      .chain()
      .command(({ dispatch, tr, state }) => {
        if (dispatch) {
          if (currentNodeIsEmptyParagraph) {
            tr.insertText('/', currentNodePos, currentNodePos + 1);
          } else {
            tr.insert(
              insertPos,
              state.schema.nodes.paragraph.create(null, [state.schema.text('/')])
            );
          }

          return dispatch(tr);
        }

        return true;
      })
      .focus(focusPos)
      .run();
  };
</script>

<DragHandle
  bind:node={currentNode}
  bind:pos={currentNodePos}
  bind:element
  class={cn('0.25 transition-all', className)}
>
  <Button
    variant="ghost"
    size="icon-sm"
    class="opacity-60 hover:opacity-100 focus-visible:opacity-100 active:opacity-100"
    onclick={insertNode}
  >
    <Plus />
  </Button>
  <Menu bind:open>
    <MenuTrigger
      class={buttonVariants({
        variant: 'ghost',
        size: 'icon-sm',
        class:
          'z-0! cursor-grab! opacity-60 hover:opacity-100 focus-visible:opacity-100 active:opacity-100 data-popup-open:opacity-100'
      })}
      aria-label="Open block menu"
    >
      <GripVertical />
    </MenuTrigger>
    <MenuPopup class="w-48 min-h-fit" portalProps={{ container: element }}>
      <MenuGroup>
        <MenuGroupLabel class="text-muted-foreground capitalize">
          {currentNode?.type.name}
        </MenuGroupLabel>
        <MenuSub>
          <MenuSubTrigger delay={300}>
            <Repeat2 />
            Turn Into
          </MenuSubTrigger>
          <MenuSubPopup class="max-h-96 overflow-auto">
            {#each Object.entries(turnIntos) as [key, turnIntoCommands] (key)}
              <MenuGroup>
                <MenuGroupLabel class="capitalize">{key}</MenuGroupLabel>
                {#each turnIntoCommands as command (command)}
                  {@const Icon = command.icon}
                  <MenuItem
                    onclick={() => {
                      if (currentNode && currentNodePos >= 0)
                        command.turnInto?.(editor, currentNode, currentNodePos);
                    }}
                  >
                    <Icon />
                    <span>{command.tooltip}</span>
                    {#if command.shortCut}
                      <MenuShortcut>{command.shortCut}</MenuShortcut>
                    {/if}
                  </MenuItem>
                {/each}
                {#if key !== Object.keys(turnIntos).at(-1)}
                  <MenuSeparator />
                {/if}
              </MenuGroup>
            {/each}
          </MenuSubPopup>
        </MenuSub>
      </MenuGroup>
      <MenuSub>
        <MenuSubTrigger delay={300}>
          <Palette />
          Colors
        </MenuSubTrigger>
        <MenuSubPopup class="max-h-96 overflow-auto">
          <MenuGroup>
            <MenuGroupLabel>Texts</MenuGroupLabel>
            {#each quickcolors as color (color.label)}
              <MenuItem
                title={color.value}
                onclick={() => {
                  if (color.value === '' || color.label === 'Default')
                    editor.chain().setNodeSelection(currentNodePos).unsetColor().run();
                  else editor.chain().setNodeSelection(currentNodePos).setColor(color.value).run();
                }}
              >
                <span style={`color: ${color.value};`}>A</span>
                <span class="capitalize">{color.label}</span>
              </MenuItem>
            {/each}
          </MenuGroup>
          <MenuSeparator />
          <MenuGroup class="min-w-fit">
            <MenuGroupLabel>Background</MenuGroupLabel>
            {#each quickcolors as color (color.label)}
              <MenuItem
                title={color.value}
                onclick={() => {
                  if (color.value === '' || color.label === 'Default')
                    editor.chain().setNodeSelection(currentNodePos).unsetHighlight().run();
                  else
                    editor
                      .chain()
                      .setNodeSelection(currentNodePos)
                      .setHighlight({ color: `${color.value}50` })
                      .run();
                }}
              >
                <span
                  class="size-4 rounded-full border"
                  style={`background-color: ${`${color.value}50`};`}
                ></span>
                <span class="capitalize">{color.label}</span>
              </MenuItem>
            {/each}
          </MenuGroup>
        </MenuSubPopup>
      </MenuSub>
      <MenuSub>
        <MenuSubTrigger delay={300}>
          <TextAlignCenter />
          AlignMent
        </MenuSubTrigger>
        <MenuSubPopup class="w-48">
          <MenuGroup>
            <MenuGroupLabel>Alignments</MenuGroupLabel>
            {#each alignments as alignment (alignment)}
              {@const Icon = alignment.icon}
              <MenuItem
                onclick={() => {
                  if (currentNode && currentNodePos >= 0)
                    alignment.turnInto?.(editor, currentNode, currentNodePos);
                }}
              >
                <Icon />
                {alignment.tooltip}
                <MenuShortcut>
                  {alignment.shortCut}
                </MenuShortcut>
              </MenuItem>
            {/each}
          </MenuGroup>
        </MenuSubPopup>
      </MenuSub>
      <MenuSeparator />
      <MenuItem onclick={insertNode}>
        <Plus />
        Insert Next
      </MenuItem>
      <MenuItem onclick={handleRemoveFormatting}>
        <RemoveFormatting />
        Remove Formatting
      </MenuItem>
      <MenuSeparator />
      <MenuItem onclick={handleDuplicate}>
        <Duplicate />
        Duplicate
      </MenuItem>
      <MenuSub>
        <MenuSubTrigger>
          <Clipboard />
          Copy...
        </MenuSubTrigger>
        <MenuSubPopup class="w-48">
          <MenuGroup>
            <MenuGroupLabel>Copy as</MenuGroupLabel>
            <MenuItem onclick={handleCopyToClipboard}>
              <Clipboard />
              Copy Content
            </MenuItem>
            <MenuItem onclick={() => handleCopyContentAs('markdown')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                ><path
                  fill="currentColor"
                  d="M2.491 4.046a.75.75 0 0 1 .83.218L7 8.592l3.678-4.328A.75.75 0 0 1 12 4.75v9.5a.75.75 0 0 1-1.5 0V6.79l-2.929 3.446a.75.75 0 0 1-1.142 0L3.5 6.79v7.46a.75.75 0 0 1-1.5 0v-9.5a.75.75 0 0 1 .491-.704M13.22 11.72a.75.75 0 0 1 1.06 0l.72.72V4.75a.75.75 0 0 1 1.5 0v7.69l.72-.72a.75.75 0 1 1 1.06 1.06l-2 2a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 0 1 0-1.06"
                /></svg
              >
              Copy as Markdown
            </MenuItem>
            <MenuItem onclick={() => handleCopyContentAs('json')}>
              <Braces />
              Copy as JSON
            </MenuItem>
          </MenuGroup>
        </MenuSubPopup>
      </MenuSub>
      <MenuSeparator />
      <MenuItem variant="destructive" onclick={handleDelete}>
        <Delete />
        Delete
      </MenuItem>
    </MenuPopup>
  </Menu>
</DragHandle>
