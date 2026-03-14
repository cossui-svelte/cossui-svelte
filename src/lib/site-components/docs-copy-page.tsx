"use client";

import { useCopyToClipboard } from "@coss/ui/hooks/use-copy-to-clipboard";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/registry/default/ui/button";

export function DocsCopyPage({ page }: { page: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Button onClick={() => copyToClipboard(page)} size="xs" variant="outline">
      {isCopied ? (
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={2.5} />
      ) : (
        <HugeiconsIcon icon={Copy01Icon} strokeWidth={2.5} />
      )}
      Copy Markdown
    </Button>
  );
}
