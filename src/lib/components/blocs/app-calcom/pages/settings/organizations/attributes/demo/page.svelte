<script lang="ts">
  import type { AttributeItem } from '../attribute-types.js';
  import AttributesPageContent from '../attributes-page-content.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();

  const demoAttributes: AttributeItem[] = [
    {
      details: 'Multi-select · 1 options',
      enabled: true,
      id: 'attr_1',
      name: 'test'
    },
    {
      details: 'Single-select · 3 options',
      enabled: true,
      id: 'attr_2',
      name: 'test2'
    }
  ];
</script>

<AttributesPageContent attributes={demoAttributes} />
