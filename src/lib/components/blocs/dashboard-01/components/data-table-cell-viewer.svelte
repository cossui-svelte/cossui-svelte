<script lang="ts">
  import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
  import { scaleUtc } from 'd3-scale';
  import { curveNatural } from 'd3-shape';
  import { AreaChart } from 'layerchart';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Chart, type ChartConfig, ChartTooltip } from '$lib/components/ui/chart';
  import {
    Drawer,
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger
  } from '$lib/components/ui/drawer';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Select, SelectItem, SelectPopup, SelectTrigger } from '$lib/components/ui/select';
  import { Separator } from '$lib/components/ui/separator';
  import { IsMobile } from '$lib/hooks/use-is-mobile.svelte';
  import { cn } from '$lib/utils';
  import type { Schema } from './schemas.js';

  const chartData = [
    { date: new Date('2024-01-01'), desktop: 186, mobile: 80 },
    { date: new Date('2024-02-01'), desktop: 305, mobile: 200 },
    { date: new Date('2024-03-01'), desktop: 237, mobile: 120 },
    { date: new Date('2024-04-01'), desktop: 73, mobile: 190 },
    { date: new Date('2024-05-01'), desktop: 209, mobile: 130 },
    { date: new Date('2024-06-01'), desktop: 214, mobile: 140 }
  ];

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'var(--primary)'
    },
    mobile: {
      label: 'Mobile',
      color: 'var(--primary)'
    }
  } satisfies ChartConfig;

  const isMobile = new IsMobile();

  let { item }: { item: Schema } = $props();

  let type = $derived(item.type);
  let status = $derived(item.status);
  let reviewer = $derived(item.reviewer);
</script>

<Drawer position={isMobile.current ? 'bottom' : 'right'}>
  <DrawerTrigger
    class={cn(buttonVariants({ variant: 'link' }), 'w-fit px-0 text-start text-foreground')}
  >
    {item.header}
  </DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader class="gap-1">
      <DrawerTitle>{item.header}</DrawerTitle>
      <DrawerDescription>Showing total visitors for the last 6 months</DrawerDescription>
    </DrawerHeader>
    <div class="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
      {#if !isMobile.current}
        <Chart config={chartConfig}>
          <AreaChart
            data={chartData}
            x="date"
            xScale={scaleUtc()}
            yDomain={[0, 600]}
            series={[
    {
      key: 'mobile',
      label: 'Mobile',
      color: chartConfig.mobile.color
    },
    {
      key: 'desktop',
      label: 'Desktop',
      color: chartConfig.desktop.color
    }
  ]}
            seriesLayout="stack"
            props={{
    area: {
      curve: curveNatural,
      fillOpacity: 0.4,
      line: { class: 'stroke-1' },
      motion: 'tween'
    },
    xAxis: {
      format: (v) => v.toLocaleDateString('en-US', { month: 'short' })
    },
    yAxis: { ticks: [0, 300, 600] }
  }}
          >
            {#snippet tooltip()}
              <ChartTooltip
                labelFormatter={(v) => {
    return (v as Date).toLocaleDateString('en-US', {
      month: 'long'
    });
  }}
                indicator="dot"
              />
            {/snippet}
          </AreaChart>
        </Chart>
        <Separator />
        <div class="grid gap-2">
          <div class="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month
            <TrendingUpIcon class="size-4" />
          </div>
          <div class="text-muted-foreground">
            Showing total visitors for the last 6 months. This is just some random text to test the
            layout. It spans multiple lines and should wrap around.
          </div>
        </div>
        <Separator />
      {/if}
      <form class="flex flex-col gap-4">
        <div class="flex flex-col gap-3">
          <Label for="header">Header</Label>
          <Input id="header" value={item.header} />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-3">
            <Label for="type">Type</Label>
            <Select bind:value={type}>
              <SelectTrigger id="type" class="w-full">
                {type ?? 'Select a type'}
              </SelectTrigger>
              <SelectPopup>
                <SelectItem value="Table of Contents">Table of Contents</SelectItem>
                <SelectItem value="Executive Summary">Executive Summary</SelectItem>
                <SelectItem value="Technical Approach">Technical Approach</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Capabilities">Capabilities</SelectItem>
                <SelectItem value="Focus Documents">Focus Documents</SelectItem>
                <SelectItem value="Narrative">Narrative</SelectItem>
                <SelectItem value="Cover Page">Cover Page</SelectItem>
              </SelectPopup>
            </Select>
          </div>
          <div class="flex flex-col gap-3">
            <Label for="status">Status</Label>
            <Select bind:value={status}>
              <SelectTrigger id="status" class="w-full">
                {status ?? 'Select a status'}
              </SelectTrigger>
              <SelectPopup>
                <SelectItem value="Done">Done</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
              </SelectPopup>
            </Select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-3">
            <Label for="target">Target</Label>
            <Input id="target" value={item.target} />
          </div>
          <div class="flex flex-col gap-3">
            <Label for="limit">Limit</Label>
            <Input id="limit" value={item.limit} />
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <Label for="reviewer">Reviewer</Label>
          <Select bind:value={reviewer}>
            <SelectTrigger id="reviewer" class="w-full">
              {reviewer ?? 'Select a reviewer'}
            </SelectTrigger>
            <SelectPopup>
              <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
              <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
              <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
            </SelectPopup>
          </Select>
        </div>
      </form>
    </div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose class={cn(buttonVariants({ variant: 'outline' }))}>Done</DrawerClose>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
