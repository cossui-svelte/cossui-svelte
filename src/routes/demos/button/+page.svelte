<script lang="ts">
  import DownloadIcon from "@lucide/svelte/icons/download";
  import { Button } from "$lib/components/ui/button";
  import { Spinner } from "$lib/components/ui/spinner";
  import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
</script>

<ComponentPreviewTabs>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <Button>Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>

  <div class="flex flex-wrap items-center justify-center gap-3">
    <Button size="xs">XSmall</Button>
    <Button size="sm">Small</Button>
    <Button>Default</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">XLarge</Button>
  </div>

  <div class="flex flex-wrap items-center justify-center gap-3">
    <Button disabled>Disabled</Button>
    <Button variant="outline" disabled>Outline Disabled</Button>
    <Button disabled>
      <Spinner />
      Loading...
    </Button>
    <Button>
      <DownloadIcon aria-hidden="true" />
      Download
    </Button>
  </div>
</ComponentPreviewTabs>
