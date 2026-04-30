import { browser } from "$app/environment";

const BREAKPOINTS = {
    "2xl": 1536,
    "3xl": 1600,
    "4xl": 2000,
    lg: 1024,
    md: 800,
    sm: 640,
    xl: 1280,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

type BreakpointQuery =
    | Breakpoint
    | `max-${Breakpoint}`
    | `${Breakpoint}:max-${Breakpoint}`;

export type MediaQueryInput = {
    min?: Breakpoint | number;
    max?: Breakpoint | number;
    /** Touch-like input (finger). Use "fine" for mouse/trackpad. */
    pointer?: "coarse" | "fine";
};

function resolveMin(value: Breakpoint | number): string {
    const px = typeof value === "number" ? value : BREAKPOINTS[value];
    return `(min-width: ${px}px)`;
}

function resolveMax(value: Breakpoint | number): string {
    const px = typeof value === "number" ? value : BREAKPOINTS[value];
    return `(max-width: ${px - 1}px)`;
}

function parseQuery(query: BreakpointQuery | MediaQueryInput | (string & {})): string {
    if (typeof query !== "string") {
        const parts: string[] = [];
        if (query.min != null) parts.push(resolveMin(query.min));
        if (query.max != null) parts.push(resolveMax(query.max));
        if (query.pointer === "coarse") parts.push("(pointer: coarse)");
        if (query.pointer === "fine") parts.push("(pointer: fine)");
        if (parts.length === 0) return "(min-width: 0px)";
        return parts.join(" and ");
    }

    if (query.startsWith("(")) return query;

    const parts: string[] = [];
    for (const segment of query.split(":")) {
        if (segment.startsWith("max-")) {
            const bp = segment.slice(4);
            if (bp in BREAKPOINTS) parts.push(resolveMax(bp as Breakpoint));
        } else if (segment in BREAKPOINTS) {
            parts.push(resolveMin(segment as Breakpoint));
        }
    }

    return parts.length > 0 ? parts.join(" and ") : query;
}

export function useMediaQuery(
    query: BreakpointQuery | MediaQueryInput | (string & {}),
): { readonly current: boolean } {
    const mediaQuery = parseQuery(query);
    let matches = $state(browser ? window.matchMedia(mediaQuery).matches : false);

    $effect(() => {
        if (!browser) return;
        const mql = window.matchMedia(mediaQuery);
        matches = mql.matches;
        const handler = (e: MediaQueryListEvent) => {
            matches = e.matches;
        };
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    });

    return {
        get current() {
            return matches;
        },
    };
}

export function useIsMobile(): { readonly current: boolean } {
    return useMediaQuery("max-md");
}
