<script lang="ts">
  import { getContext } from "svelte";
  import { SunMoon } from "lucide-svelte";
  import Button from "$lib/components/ui/button.svelte";
  import {
    THEME_CONTEXT_KEY,
    type ThemeContextType,
  } from "./theme-provider.svelte";

  const themeCtx = getContext<ThemeContextType | undefined>(THEME_CONTEXT_KEY);

  function toggleTheme() {
    if (themeCtx) {
      themeCtx.setTheme(themeCtx.resolvedTheme === "dark" ? "light" : "dark");
    } else if (typeof document !== "undefined") {
      // Fallback: toggle dark class directly
      const isDark = document.documentElement.classList.toggle("dark");
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    }
  }
</script>

<Button
  class="relative size-8"
  onclick={toggleTheme}
  size="icon"
  title="Toggle theme"
  variant="ghost"
>
  <SunMoon class="-rotate-45 size-4" strokeWidth={2} />
  <span class="sr-only">Toggle theme</span>
</Button>
