<script lang="ts">



type CategoryCardProps = {
  slug: string;
  name: string;
  description?: string;
  thumbnail?: React.ReactNode;
};

  const href = `/docs/components/${slug}`;
  const isNew = PAGES_NEW.includes(href);

</script>


{#snippet figure(name:string, href)}
<h2>
    <Link class="before:absolute before:inset-0" href={href}>
    {name}
    </Link>
</h2>
{/snippet}


    <CardFrame className="after:-inset-[5px] after:-z-1 w-full after:pointer-events-none after:absolute after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/64">
      <CardFrameHeader className="static grid grid-rows-[auto_1fr]">
        <CardFrameTitle
          className="font-heading text-base"
          render={
            <h2>
              <Link class="before:absolute before:inset-0" href={href}>
                {name}
              </Link>
            </h2>
          }
        />
        <CardFrameDescription
          className="line-clamp-2 sm:h-[2lh]"
          render={<p />}
        >
          {description || "\u00A0"}
        </CardFrameDescription>
      </CardFrameHeader>
      <Card className="pointer-events-none min-h-55 flex-1 flex-col flex-wrap overflow-x-auto bg-[color-mix(in_srgb,var(--color-card),var(--color-sidebar))] dark:bg-background">
        {isNew && (
          <Badge className="absolute end-3 top-3" variant="info">
            New
          </Badge>
        )}
        <CardPanel className="flex flex-1 items-center justify-center px-8 [--border:--alpha(var(--color-black)/7%)] [--btn-from:--alpha(var(--color-primary)/90%)] [--btn-to:var(--color-primary)] in-[[data-slot=card-frame]:has(a:not(:hover))]:*:translate-y-0.5 *:transition-transform *:duration-200 dark:[--border:--alpha(var(--color-white)/3%)] dark:[--btn-from:var(--color-primary)] dark:[--btn-to:--alpha(var(--color-primary)/90%)]">
          {thumbnail}
        </CardPanel>
      </Card>
    </CardFrame>

