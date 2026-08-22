<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { useCharacterLimit } from '$lib/hooks/use-character-limit.svelte';

  const charLimit = useCharacterLimit(14);
</script>

<div class="flex flex-col items-start gap-2">
  <Input
    aria-label="Code"
    maxlength={charLimit.maxLength}
    placeholder="Enter code"
    type="text"
    bind:value={charLimit.value}
  />
  <p class="text-muted-foreground text-xs">
    <span class="tabular-nums">{charLimit.maxLength - charLimit.characterCount}</span>
    characters left
  </p>
</div>
