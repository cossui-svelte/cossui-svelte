"use client";

import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import { cn } from "@/registry/default/lib/utils";
import { Badge } from "@/registry/default/ui/badge";

function Section({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; description?: string; value: boolean }[];
}) {
  return (
    <div>
      <h3 className="mb-2 font-medium text-sm">{title}</h3>
      <ul className="divide-y rounded-xl border">
        {rows.map((row) => (
          <li
            className="flex items-center justify-between gap-2 px-3 py-2.5"
            key={row.label}
          >
            <div className="min-w-0">
              <code className="relative break-all rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[.8125rem] text-muted-foreground outline-none">
                {row.label}
              </code>
            </div>
            <div className="flex items-center gap-2">
              {row.description && (
                <span className="ms-2 text-muted-foreground text-xs">
                  {row.description}
                </span>
              )}
              <Badge
                className={cn(
                  "min-w-11 shrink-0 rounded-full text-xs sm:h-6 sm:min-w-11",
                  !row.value && "text-muted-foreground",
                )}
                variant={row.value ? "success" : "secondary"}
              >
                {row.value ? "true" : "false"}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MediaQueryDemo() {
  const sm = useMediaQuery("sm");
  const md = useMediaQuery("md");
  const lg = useMediaQuery("lg");
  const xl = useMediaQuery("xl");
  const xxl = useMediaQuery("2xl");

  const maxSm = useMediaQuery("max-sm");
  const maxMd = useMediaQuery("max-md");
  const maxLg = useMediaQuery("max-lg");

  const smToMd = useMediaQuery("sm:max-md");
  const mdToLg = useMediaQuery("md:max-lg");
  const lgToXl = useMediaQuery("lg:max-xl");

  const pointerCoarse = useMediaQuery({ pointer: "coarse" });
  const pointerFine = useMediaQuery({ pointer: "fine" });
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div className="my-8 flex flex-col gap-6">
      <Section
        rows={[
          { description: "≥ 640px", label: `useMediaQuery("sm")`, value: sm },
          { description: "≥ 800px", label: `useMediaQuery("md")`, value: md },
          { description: "≥ 1024px", label: `useMediaQuery("lg")`, value: lg },
          { description: "≥ 1280px", label: `useMediaQuery("xl")`, value: xl },
          {
            description: "≥ 1536px",
            label: `useMediaQuery("2xl")`,
            value: xxl,
          },
        ]}
        title="Min-width (breakpoint and above)"
      />
      <Section
        rows={[
          {
            description: "< 640px",
            label: `useMediaQuery("max-sm")`,
            value: maxSm,
          },
          {
            description: "< 800px",
            label: `useMediaQuery("max-md")`,
            value: maxMd,
          },
          {
            description: "< 1024px",
            label: `useMediaQuery("max-lg")`,
            value: maxLg,
          },
        ]}
        title="Max-width (below breakpoint)"
      />
      <Section
        rows={[
          {
            description: "640 - 799px",
            label: `useMediaQuery("sm:max-md")`,
            value: smToMd,
          },
          {
            description: "800 - 1023px",
            label: `useMediaQuery("md:max-lg")`,
            value: mdToLg,
          },
          {
            description: "1024 - 1279px",
            label: `useMediaQuery("lg:max-xl")`,
            value: lgToXl,
          },
        ]}
        title="Ranges"
      />
      <Section
        rows={[
          {
            description: "touch",
            label: `useMediaQuery({ pointer: "coarse" })`,
            value: pointerCoarse,
          },
          {
            description: "mouse",
            label: `useMediaQuery({ pointer: "fine" })`,
            value: pointerFine,
          },
          {
            label: `useMediaQuery("(prefers-color-scheme: dark)")`,
            value: darkMode,
          },
          {
            label: `useMediaQuery("(prefers-reduced-motion: reduce)")`,
            value: reducedMotion,
          },
        ]}
        title="Device & preferences"
      />
    </div>
  );
}
