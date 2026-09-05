<script lang="ts">
  import ExternalLink from '@lucide/svelte/icons/external-link';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardFrame, CardPanel } from '$lib/components/ui/card';
  import { ScrollArea } from '$lib/components/ui/scroll-area';
  import DocsCopyPage from '$lib/components/app/docs/docs-copy-page.svelte';
  import DocsToc from '$lib/components/app/docs/docs-toc.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<div class="flex items-stretch xl:w-full" data-slot="docs">
  <div class="relative flex w-full min-w-0 flex-1 flex-col lg:mt-8 lg:mr-4 lg:mb-8">
    <CardFrame class="border-sidebar-border shadow-lg/5 max-lg:border-none dark:bg-background">
      <Card class="max-lg:rounded-none! dark:bg-background max-lg:[clip-path:none]!">
        <CardPanel class="px-4 py-6 sm:px-6 lg:p-8">
          <div class="mx-auto w-full max-w-3xl">
            <div class="flex min-w-0 flex-col gap-8">
              <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-2">
                  <h1 class="scroll-m-20 font-bold font-heading text-3xl xl:text-4xl">
                    {data.metadata.title}
                  </h1>
                  {#if data.metadata.description}
                    <p class="text-muted-foreground sm:text-lg">
                      {data.metadata.description}
                    </p>
                  {/if}
                </div>
                <div class="flex items-center space-x-2 pt-4">
                  {#if data.metadata.links?.doc}
                    <Button size="xs" variant="outline">
                      <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external URL from frontmatter, not an app route -->
                      <a href={data.metadata.links.doc} rel="noreferrer" target="_blank">
                        <ExternalLink />
                        API Reference
                      </a>
                    </Button>
                  {/if}
                  <DocsCopyPage page={data.raw} />
                </div>
              </div>
              <div class="w-full flex-1 *:data-[slot=alert]:first:mt-0">
                <data.Component />
              </div>
            </div>
          </div>
        </CardPanel>
      </Card>
    </CardFrame>
  </div>
  <div
    class="sticky top-(--header-height) z-30 ms-auto hidden h-[calc(100svh-var(--header-height))] w-72 flex-col overflow-hidden overscroll-none xl:flex"
  >
    <ScrollArea class="**:data-[slot=scroll-area-scrollbar]:hidden" overscrollContain scrollFade>
      <div class="flex min-h-0 flex-col gap-2 py-2">
        <div class="h-(--top-spacing) shrink-0"></div>
        {#if data.metadata.toc?.length}
          <DocsToc toc={data.metadata.toc} />
        {/if}
      </div>
    </ScrollArea>
  </div>
</div>
