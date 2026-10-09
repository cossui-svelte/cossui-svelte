<script lang="ts">
  import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
  import { Button } from '#lib/components/ui/button/index.js';
  import { href } from '../lib/router.svelte.js';
  import MobileHeader from './mobile-header.svelte';
  import SettingsDrawer from './settings-drawer.svelte';
</script>

<MobileHeader>
  <Button aria-label="Back" href={href('/event-types')} variant="ghost">
    <ArrowLeftIcon class="-ms-0.5" />
    <span>Back</span>
  </Button>
  <SettingsDrawer />
</MobileHeader>
