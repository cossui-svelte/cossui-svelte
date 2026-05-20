<script lang="ts">
import type { Snippet } from 'svelte';
import type { ToastPosition } from '$lib/varsel';
import { VarselToaster } from '$lib/varsel';

let {
  position = 'bottom-right',
  visibleToasts = 3,
  expand = true,
  duration = 5000,
  closeButton = true,
  pauseOnHover = true,
  offset = undefined,
  dir = 'auto',
  children
}: {
  position?: ToastPosition;
  visibleToasts?: number;
  expand?: boolean;
  duration?: number;
  closeButton?: boolean;
  pauseOnHover?: boolean;
  offset?: number | string;
  dir?: 'ltr' | 'rtl' | 'auto';
  children?: Snippet;
} = $props();
</script>

{@render children?.()}
<VarselToaster {position} {visibleToasts} {expand} {duration} {closeButton} {pauseOnHover} {offset} {dir} />
