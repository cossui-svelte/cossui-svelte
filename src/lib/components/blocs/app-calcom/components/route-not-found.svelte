<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';
  import { href, router } from '../lib/router.svelte.js';
</script>

<Empty>
  <EmptyHeader>
    <EmptyTitle>Page not found</EmptyTitle>
    <EmptyDescription>
      <code class="font-mono">{router.path}</code> isn't part of this example.
    </EmptyDescription>
  </EmptyHeader>
  <Button href={href('/event-types')} variant="outline">Back to event types</Button>
</Empty>
