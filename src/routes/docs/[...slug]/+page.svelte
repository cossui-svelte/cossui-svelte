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
      date: '20 Aug 2026',
      description: 'ShardsUI is a good port of BaseUI, it better aligns with upstream CossUI.',
      title: '0.9.21 — Switched to ShardsUI'
    },
    {
      date: '14 Aug 2026',
      description: 'Many issues around checkboxes are now resolved.',
      title: '0.9.20 — Checkbox and Checkbox-group components fixes'
    },
    {
      date: '12 Aug 2026',
      description:
        'Shadcn-svelte compatible registry released, allowing for easy discovery and installation of particles and components.',
      title: '0.9.19 — Registry released'
    },
    {
      date: '5 Aug 2026',
      description:
        'Map component migrated to MapLibre 6, with more map particles ported from mapcn-svelte.',
      title: '0.9.18 — Map on MapLibre 6 (latest)'
    },
    {
      date: '5 Aug 2026',
      description: 'Sidebar component brought from ShadCN.',
      title: '0.9.17 — Sidebar lands'
    },
    {
      date: '2 Aug 2026',
      description: 'Map graduates from MapCN-Svelte, alongside a new IP-address input particle.',
      title: '0.9.16 — Map graduates'
    },
    {
      date: '31 Jul 2026',
      description: 'Places-autocomplete graduates out of preview.',
      title: '0.9.15 — Places-autocomplete graduates'
    },
    {
      date: '30 Jul 2026',
      description: 'Colorpicker component arrives, built on Huey.',
      title: '0.9.14 — Colorpicker arrives'
    },
    {
      date: '26 Jul 2026',
      description: 'Major code cleanup and Svelte-only migration, with breaking changes.',
      title: '0.9.12 — Svelte-only (breaking)'
    },
    {
      date: '20 Jul 2026',
      description: 'Stepper & Timelines graduates from OriginUI',
      title: '0.9.11 — Stepper & Timelines graduate'
    },
    {
      date: '19 Jul 2026',
      description: 'File-upload particles added from OriginUI.',
      title: '0.9.10 — File upload'
    },
    {
      date: '11 Jul 2026',
      description: 'Tree particules with Drag and Drop support',
      title: '0.9.7 — Tree component graduates'
    },
    {
      date: '10 Jul 2026',
      description: 'Chart component, adapted from shadcn-svelte',
      title: '0.9.6 — Chart component graduates'
    },
    {
      date: '9 Jul 2026',
      description: 'Cropper component built out and finished across the release — the big one.',
      title: '0.9.4 — Cropper component released'
    },
    {
      date: '9 Mar 2026',
      description: 'Prototyping of the core components & layout.',
      title: '0.0.1 — Initial release'
    }
  ];
</script>

<div class="container w-full">
  <PageHeader>
    <PageHeaderHeading>DOCS: COMING SOON</PageHeaderHeading>
    <PageHeaderDescription>
      I’ve been wondering: in the age of AI, is documentation still necessary?<br /> You can point
      your assistant to the product and ask questions to get instant answers.<br />It appears that
      the days where developers read full documentation are gone.<br /><br />Let’s prioritize on the
      AI experience over traditional documentation.<br />If you have questions or need help, feel
      free to reach out to me directly. I’m here to help.
    </PageHeaderDescription>
  </PageHeader>

  <h1 class="scroll-m-20 font-bold font-heading text-3xl xl:text-4xl">Why CossUI-Svelte?</h1>

  <main class="m-8">
    <ul class="space-y-3 text-muted-foreground">
      <li>
        <strong class="font-semibold text-foreground">Modern look</strong> — Clean, contemporary styling
        with layered shadows and softly rounded surfaces.
      </li>
      <li>
        <strong class="font-semibold text-foreground">Mobile ready</strong> — Responsive layouts that
        adapt to any screen size, with swipe and touch gestures built in.
      </li>
      <li>
        <strong class="font-semibold text-foreground">Batteries included</strong> — 70 components and
        700+ blocks and particules, including forms, fieldset and skeletons. Now you can focus on your
        application logic instead of reinventing the wheel.
      </li>
      <li>
        <strong class="font-semibold text-foreground">Built on Base UI</strong> — Powered by Shards UI,
        a Svelte port of Base UI.
      </li>
      <li>
        <strong class="font-semibold text-foreground">Svelte 5 native</strong> — Intuitiveness by default.
      </li>
    </ul>
  </main>

  <h1 class="scroll-m-20 font-bold font-heading text-3xl xl:text-4xl">Changelog Highlights</h1>

  <main class="m-8">
    <Timeline defaultValue={changelog.length} orientation="vertical">
      {#each changelog as entry, i (i)}
        <TimelineItem step={i + 1} class="group-data-[orientation=vertical]/timeline:ms-10">
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
