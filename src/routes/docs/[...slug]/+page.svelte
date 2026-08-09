<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import PageHeader from '$lib/components/app/page-header.svelte';
  import PageHeaderDescription from '$lib/components/app/page-header-description.svelte';
  import PageHeaderHeading from '$lib/components/app/page-header-heading.svelte';
  import {
    Timeline,
    TimelineContent,
    TimelineDate,
    TimelineHeader,
    TimelineIndicator,
    TimelineItem,
    TimelineSeparator,
    TimelineTitle
  } from '$lib/components/ui/timeline';

  const changelog = [
    {
      date: '5 Aug 2026',
      description:
        'Map component migrated to MapLibre 6, with more map particles ported from mapcn-svelte.',
      id: 1,
      title: '0.9.18 — Map on MapLibre 6 (latest)'
    },
    {
      date: '5 Aug 2026',
      description: 'Sidebar component brought from ShadCN.',
      id: 2,
      title: '0.9.17 — Sidebar lands'
    },
    {
      date: '2 Aug 2026',
      description: 'Map graduates from MapCN-Svelte, alongside a new IP-address input particle.',
      id: 3,
      title: '0.9.16 — Map graduates'
    },
    {
      date: '31 Jul 2026',
      description: 'Places-autocomplete graduates out of preview.',
      id: 4,
      title: '0.9.15 — Places-autocomplete graduates'
    },
    {
      date: '30 Jul 2026',
      description: 'Colorpicker component arrives, built on Huey.',
      id: 5,
      title: '0.9.14 — Colorpicker arrives'
    },
    {
      date: '26 Jul 2026',
      description: 'Major code cleanup and Svelte-only migration, with breaking changes.',
      id: 6,
      title: '0.9.12 — Svelte-only (breaking)'
    },
    {
      date: '20 Jul 2026',
      description: 'Stepper & Timelines graduates from OriginUI',
      id: 7,
      title: '0.9.11 — Stepper & Timelines graduate'
    },
    {
      date: '19 Jul 2026',
      description: 'File-upload particles added from OriginUI.',
      id: 8,
      title: '0.9.10 — File upload'
    },
    {
      date: '11 Jul 2026',
      description: 'Tree particules with Drag and Drop support',
      id: 9,
      title: '0.9.7 — Tree component graduates'
    },
    {
      date: '10 Jul 2026',
      description: 'Chart component, adapted from shadcn-svelte',
      id: 10,
      title: '0.9.6 — Chart component graduates'
    },
    {
      date: '9 Jul 2026',
      description: 'Cropper component built out and finished across the release — the big one.',
      id: 11,
      title: '0.9.4 — Cropper component released'
    },
    {
      date: '9 Mar 2026',
      description: 'Prototyping of the core components & layout.',
      id: 12,
      title: '0.0.1 — Initial release'
    }
  ];
</script>

<div class="container w-full">
  <PageHeader>
    <PageHeaderHeading>DOCS: COMING SOON</PageHeaderHeading>
    <PageHeaderDescription>
      I’ve been wondering: in the age of AI, is a documentation still necessary?<br /> You can point
      your assistant to the product and ask questions to get instant answers.<br />It appears that
      the days where developers read full documentation are gone.<br /><br />Let’s prioritize on the
      AI experience over traditional documentation.<br />If you have questions or need help, feel
      free to reach out to me directly. I’m here to help.
    </PageHeaderDescription>
  </PageHeader>

  <h1 class="scroll-m-20 font-bold font-heading text-3xl xl:text-4xl">Changelog Highlights</h1>

  <main class="mt-16">
    <Timeline defaultValue={changelog.length} orientation="vertical">
      {#each changelog as entry (entry.id)}
        <TimelineItem step={entry.id} class="group-data-[orientation=vertical]/timeline:ms-10">
          <TimelineHeader>
            <TimelineSeparator
              class="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-[1.625rem]"
            />
            <TimelineDate>{entry.date}</TimelineDate>
            <TimelineTitle>{entry.title}</TimelineTitle>
            <TimelineIndicator
              class="flex size-6 items-center justify-center group-data-[orientation=vertical]/timeline:-left-7 group-data-[completed]/timeline-item:border-none group-data-[completed]/timeline-item:bg-primary group-data-[completed]/timeline-item:text-primary-foreground"
            >
              <CheckIcon class="group-[:not([data-completed])]/timeline-item:hidden" size={16} />
            </TimelineIndicator>
          </TimelineHeader>
          <TimelineContent>{entry.description}</TimelineContent>
        </TimelineItem>
      {/each}
    </Timeline>
  </main>
</div>
