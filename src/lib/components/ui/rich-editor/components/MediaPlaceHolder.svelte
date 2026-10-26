<script lang="ts">
  import { AudioLines, Video, Image, CodeXml } from '@lucide/svelte';
  import { type NodeViewProps } from '@tiptap/core';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { Tabs, TabsList, TabsPanel, TabsTab } from '#lib/components/ui/tabs/index.js';
  import { nodeViewPortalProps } from '../helpers';
  import { NodeViewWrapper } from '../tiptap';

  const { editor, node }: NodeViewProps = $props();
  let open = $state(false);
  const mediaType = $derived(node.attrs.mediaType);
  let url = $state('');
  let files = $state<FileList | undefined>();

  function handleFileSubmit(e: SubmitEvent) {
    e.preventDefault();
    const file = files?.[0];
    if (file) {
      editor.commands.uploadMedia(file);
      open = false;
    }
  }

  const mediaTypeData = $derived.by(() => {
    switch (mediaType) {
      case 'audio':
        return {
          icon: AudioLines,
          text: 'Insert An Audio File'
        };
      case 'video':
        return {
          icon: Video,
          text: 'Insert An Video File'
        };
      case 'image':
        return {
          icon: Image,
          text: 'Insert An Image File'
        };
      case 'iframe':
        return {
          icon: CodeXml,
          text: 'Insert An IFrame'
        };
    }
  });

  function setMediaFn(src: string) {
    const value = src.trim();
    if (!value) return;
    if (mediaType === 'audio') {
      editor.chain().focus().setAudio({ src: value }).run();
    } else if (mediaType === 'video') {
      editor.chain().focus().setVideo({ src: value }).run();
    } else if (mediaType === 'image') {
      editor.chain().focus().setImage({ src: value }).run();
    } else if (mediaType === 'iframe') {
      editor.chain().focus().setIframe({ src: value }).run();
    }
    open = false;
  }
</script>

<NodeViewWrapper class="my-2 w-full!">
  {@const Icon = mediaTypeData?.icon}
  {@const text = mediaTypeData?.text}
  <Popover bind:open>
    <PopoverTrigger
      as="div"
      contenteditable="false"
      aria-label={text}
      class="flex min-h-14 w-full cursor-pointer items-center gap-2 rounded-lg border border-dashed bg-muted/30 p-4 text-start transition-colors hover:bg-muted/50"
    >
      <Icon class="size-4 text-muted-foreground" />
      <span class="text-sm text-muted-foreground">{text}</span>
    </PopoverTrigger>
    <PopoverPopup class="w-80" portalProps={nodeViewPortalProps}>
      <Tabs value="link" class="w-full">
        <TabsList>
          <TabsTab value="link">Link</TabsTab>
          {#if mediaType !== 'iframe'}
            <TabsTab value="file">File</TabsTab>
          {/if}
        </TabsList>
        <TabsPanel value="link">
          <form
            class="flex flex-col gap-2"
            onsubmit={(e) => {
              e.preventDefault();
              setMediaFn(url);
            }}
          >
            <Input type="url" bind:value={url} placeholder="https://..." aria-label="Media URL" />
            <Button type="submit" class="capitalize">Insert {mediaType}</Button>
          </form>
        </TabsPanel>
        {#if mediaType !== 'iframe'}
          <TabsPanel value="file">
            <form class="flex flex-col gap-2" onsubmit={handleFileSubmit}>
              <Input
                type="file"
                aria-label="Media file"
                onchange={(e) => {
                  files = (e.currentTarget as HTMLInputElement).files ?? undefined;
                }}
              />
              <Button type="submit" class="capitalize">Insert {mediaType}</Button>
            </form>
          </TabsPanel>
        {/if}
      </Tabs>
    </PopoverPopup>
  </Popover>
</NodeViewWrapper>
