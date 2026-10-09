<script lang="ts">
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import type { AttributeItem } from './attribute-types.js';
  import AttributesSection from './attributes-section.svelte';

  let { attributes }: { attributes: AttributeItem[] } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Attributes">
    <AppHeaderDescription>Manage attributes for your team members</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<AttributesSection {attributes} />
