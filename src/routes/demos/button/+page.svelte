<script lang="ts">
  import ComponentPreviewTab from "$lib/components/app/ComponentPreviewTabs.svelte";

  import { Spinner } from "$lib/components/ui/spinner";
  import { Button } from "$lib/components/ui/button";
  import { DownloadIcon } from "lucide-svelte";
</script>

<div
  class="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-8"
>
  <h1 class="text-foreground text-2xl font-semibold">
    Button Component Preview
  </h1>
  <ComponentPreviewTab>
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
      <!--<Button render={<Link href="/" />}>Link</Button>-->
    </div>
  </ComponentPreviewTab>
</div>
