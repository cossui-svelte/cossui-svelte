<script lang="ts">
  import { Sparkle } from '@lucide/svelte';
  import Check from '@lucide/svelte/icons/check';
  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
  import Copy from '@lucide/svelte/icons/copy';
  import Search from '@lucide/svelte/icons/search';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Combobox,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxTrigger,
    ComboboxValue
  } from '#lib/components/ui/combobox/index.js';
  import { nodeViewPortalProps } from '../helpers';
  import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from '../tiptap';
  import Tooltip from './Tooltip.svelte';

  const { editor, node, updateAttributes, extension, getPos }: NodeViewProps = $props();

  let preRef = $state<HTMLPreElement>();
  let isCopying = $state(false);
  const languages: { label: string; value: string }[] = $derived(
    extension.options.lowlight
      .listLanguages()
      .sort()
      .map((language: string) => ({ label: language, value: language }))
  );
  const defaultLanguage = $derived<string>(node.attrs.language ?? 'plaintext');

  const changeLanguage = (language: string) => {
    updateAttributes({ language });
  };

  function copyCode() {
    if (!preRef) return;
    isCopying = true;
    navigator.clipboard.writeText(preRef.innerText);
    setTimeout(() => {
      isCopying = false;
    }, 1000);
  }

  function convertToMermaid() {
    const code = node.textContent;
    const pos = getPos();
    if (typeof pos !== 'number') return;
    editor
      .chain()
      .focus()
      .deleteRange({ from: pos, to: pos + node.nodeSize })
      .insertContentAt(pos, {
        type: 'mermaid',
        content: [
          {
            type: 'text',
            text: code || ''
          }
        ]
      })
      .run();
  }
</script>

<NodeViewWrapper class="my-4 rounded-lg bg-muted pb-4 dark:bg-muted/20">
  <div class="mx-2 flex items-center justify-end gap-2 print:justify-start" contenteditable="false">
    {#if defaultLanguage.toLowerCase() === 'mermaid'}
      <Tooltip tooltip="Convert to Mermaid Diagram" as="span" class="inline-flex">
        <Button variant="ghost" size="icon-xs" class="print:hidden" onclick={convertToMermaid}>
          <Sparkle />
        </Button>
      </Tooltip>
    {/if}
    <div class="relative print:hidden">
      <Tooltip tooltip="Change language" as="span" class="inline-flex">
        <Combobox
          items={languages}
          value={defaultLanguage}
          autoHighlight
          disabled={!editor.isEditable}
          onValueChange={(language) => {
            if (typeof language === 'string') changeLanguage(language);
          }}
        >
          <ComboboxTrigger
            contenteditable="false"
            aria-label="Code block language"
            class={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              class: 'gap-1 text-xs text-muted-foreground capitalize'
            })}
          >
            <ComboboxValue placeholder="plaintext" />
          </ComboboxTrigger>
          <ComboboxPopup
            aria-label="Code block language"
            class="w-56 p-0!"
            align="end"
            portalProps={nodeViewPortalProps}
          >
            <div class="border-b p-2">
              <ComboboxInput placeholder="Search languages..." showTrigger={false}>
                {#snippet startAddon()}
                  <Search />
                {/snippet}
              </ComboboxInput>
            </div>
            <ComboboxEmpty>No languages found.</ComboboxEmpty>
            <ComboboxList>
              <ComboboxCollection>
                {#snippet children(item: { label: string; value: string })}
                  <ComboboxItem value={item.value} label={item.label} class="capitalize">
                    {item.label}
                  </ComboboxItem>
                {/snippet}
              </ComboboxCollection>
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
      </Tooltip>
    </div>
    <Button
      variant="ghost"
      size="icon-xs"
      class="text-muted-foreground print:hidden"
      onclick={copyCode}
    >
      {#if isCopying}
        <Check class=" text-green-500" />
      {:else}
        <Copy />
      {/if}
    </Button>
  </div>
  <pre bind:this={preRef} draggable={false} spellcheck="false">
		<NodeViewContent as="code" class={`language-${defaultLanguage}`} {...node.attrs} />
	</pre>
</NodeViewWrapper>
