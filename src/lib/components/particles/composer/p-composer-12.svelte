<script lang="ts">
  import ArrowUp from '@lucide/svelte/icons/arrow-up';
  import {
    Composer,
    ComposerActionGroup,
    ComposerActions,
    ComposerInput,
    ComposerItem,
    type ComposerItemValue,
    ComposerList,
    ComposerPopup,
    ComposerSubmit,
    type ComposerValue,
    getComposerText
  } from '#lib/components/ui/composer/index.js';
  import { searchEmoji } from '#lib/data/emoji.js';

  let value = $state<ComposerValue>([]);
  let emoji = $state<ComposerItemValue[]>([]);
  let notice = $state('');
</script>

<div class="flex w-full max-w-xl flex-col gap-3">
  <Composer
    bind:value
    onQueryChange={(query) => {
      emoji = query?.character === ':' ? searchEmoji(query.text) : [];
    }}
    triggers={[{ character: ':', items: emoji, filter: null }]}
    onSubmit={(draft) => {
      notice = `Sent: ${getComposerText(draft)}`;
      value = [];
    }}
  >
    <ComposerInput aria-label="Message" placeholder="Type :thu for 👍" />
    <ComposerPopup>
      <ComposerList>
        {#snippet children(item)}
          <ComposerItem value={item}>
            <span class="shrink-0 text-xl/none">{item.text}</span>
            <span class="truncate text-muted-foreground">:{item.label}:</span>
          </ComposerItem>
        {/snippet}
      </ComposerList>
    </ComposerPopup>
    <ComposerActions>
      <ComposerActionGroup align="end">
        <ComposerSubmit aria-label="Send message" size="icon">
          <ArrowUp aria-hidden="true" />
        </ComposerSubmit>
      </ComposerActionGroup>
    </ComposerActions>
  </Composer>
  <p aria-live="polite" class="text-muted-foreground text-sm">{notice}</p>
</div>
