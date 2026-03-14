import fs from "node:fs/promises";
import path from "node:path";
import { CodeBlock } from "@coss/ui/shared/code-block";
import type * as React from "react";

import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import { getRegistryItem } from "@/lib/registry";
import { cn } from "@/lib/utils";

export async function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
}: React.ComponentProps<"div"> & {
  name?: string;
  src?: string;
  title?: string;
  language?: string;
  collapsible?: boolean;
}) {
  if (!name && !src) {
    return null;
  }

  let code: string | undefined;

  if (name) {
    const item = await getRegistryItem(name);
    code = item?.files?.[0]?.content;
  }

  if (src) {
    const file = await fs.readFile(path.join(process.cwd(), src), "utf-8");
    code = file;
  }

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx";

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <CodeBlock code={code} language={lang} title={title} />
      </div>
    );
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <CodeBlock code={code} language={lang} title={title} />
    </CodeCollapsibleWrapper>
  );
}
