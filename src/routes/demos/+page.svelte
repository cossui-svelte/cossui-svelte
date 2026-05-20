<script lang="ts">
let { data } = $props();

function formatName(folder: string): string {
  return folder
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
</script>

<div class="min-h-screen bg-background px-6 py-12">
    <div class="mx-auto max-w-4xl">
        <div class="mb-10">
            <h1 class="text-3xl font-bold tracking-tight text-foreground">
                Component Demos
            </h1>
            <p class="mt-2 text-muted-foreground">
                Browse live previews of all available UI components.
            </p>
        </div>

        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {#each data.folders as folder}
                <a
                    href="/demos/{folder}"
                    class="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <span class="truncate">{formatName(folder)}</span>
                </a>
            {/each}
        </div>
    </div>
</div>
