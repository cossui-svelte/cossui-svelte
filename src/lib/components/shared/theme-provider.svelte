<script module lang="ts">
  export type ThemeContextType = {
    readonly resolvedTheme: string;
    setTheme: (theme: string) => void;
  };

  export const THEME_CONTEXT_KEY = Symbol("theme");
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext, onMount } from "svelte";

  interface Props {
    children?: Snippet;
    defaultTheme?: string;
    attribute?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    enableColorScheme?: boolean;
  }

  let {
    children,
    defaultTheme = "system",
    attribute = "class",
    enableSystem = true,
    disableTransitionOnChange = false,
    enableColorScheme = true,
  }: Props = $props();

  let theme = $state(defaultTheme);
  let resolvedTheme = $state("light");

  function resolveTheme(t: string): string {
    if (t === "system" && enableSystem) {
      return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return t === "dark" ? "dark" : "light";
  }

  function applyTheme(resolved: string) {
    if (typeof document === "undefined") return;

    if (disableTransitionOnChange) {
      const style = document.createElement("style");
      style.textContent = "*,*::before,*::after{transition:none!important}";
      document.head.appendChild(style);
      requestAnimationFrame(() => style.remove());
    }

    if (attribute === "class") {
      document.documentElement.classList.toggle("dark", resolved === "dark");
    } else {
      document.documentElement.setAttribute(attribute, resolved);
    }

    if (enableColorScheme) {
      document.documentElement.style.colorScheme = resolved;
    }
  }

  setContext<ThemeContextType>(THEME_CONTEXT_KEY, {
    get resolvedTheme() {
      return resolvedTheme;
    },
    setTheme(t: string) {
      theme = t;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", t);
      }
    },
  });

  onMount(() => {
    const stored = localStorage.getItem("theme");
    if (stored) theme = stored;

    resolvedTheme = resolveTheme(theme);
    applyTheme(resolvedTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        resolvedTheme = resolveTheme(theme);
        applyTheme(resolvedTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  });

  $effect(() => {
    resolvedTheme = resolveTheme(theme);
    applyTheme(resolvedTheme);
  });
</script>

{@render children?.()}
