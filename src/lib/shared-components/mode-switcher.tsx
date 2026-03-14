"use client";

import { Button } from "@coss/ui/components/button";
import { LayerMask01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import * as React from "react";

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      className="relative size-8"
      onClick={toggleTheme}
      size="icon"
      title="Toggle theme"
      variant="ghost"
    >
      <HugeiconsIcon
        className="-rotate-45 size-4"
        icon={LayerMask01Icon}
        strokeWidth={2}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
