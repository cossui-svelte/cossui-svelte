<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    LinkPreviewCard,
    LinkPreviewContent,
    LinkPreviewTrigger,
  } from "$lib/components/ui/link-preview";
</script>

<LinkPreviewCard closeDelay={100} openDelay={10}>
  <LinkPreviewTrigger>
    {#snippet child({ props })}
      <Button variant="link" {...props}>Link (Please mouse hover)</Button>
    {/snippet}
  </LinkPreviewTrigger>
  <LinkPreviewContent class="flex w-64 flex-col gap-0.5">
    <div class="font-semibold">@svelte</div>
    <div>The Svelte Framework – created and maintained by @vercel.</div>
    <div class="mt-1 text-xs text-muted-foreground">Joined December 2021</div>
  </LinkPreviewContent>
</LinkPreviewCard>
