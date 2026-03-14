<script lang="ts">
    import { DocsSidebar } from "@/components/docs-sidebar";
    import { source } from "@/lib/source";
    import { SidebarProvider } from "@/registry/default/ui/sidebar";
    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

<main class="flex flex-1 flex-col">
    <SidebarProvider
        className="container min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]"
    >
        <DocsSidebar tree={source.pageTree} />
        <div class="h-full w-full">{@render children()}</div>
    </SidebarProvider>
</main>
