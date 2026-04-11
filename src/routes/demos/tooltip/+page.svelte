<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";

    import {
        Circle,
        ChevronDown,
        ChevronLeft,
        ChevronRight,
        ChevronUp,
    } from "lucide-svelte";
    import {
        Tooltip,
        TooltipContent,
        TooltipProvider,
        TooltipTrigger,
    } from "$lib/components/ui/tooltip";
    import { Kbd, KbdGroup } from "$lib/components/ui/kbd";
</script>

<ComponentPreviewTabs>
    <div class="inline-grid w-fit grid-cols-3 gap-1">
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger>
                    {#snippet child({ props })}
                        <Button
                            class="col-start-2"
                            variant="outline"
                            size="icon"
                            aria-label="Pan camera up"
                            {...props}
                        >
                            <ChevronUp size={16} aria-hidden="true" />
                        </Button>
                    {/snippet}
                </TooltipTrigger>
                <TooltipContent side="top" class="px-2 py-1 text-xs">
                    Pan top
                    <Kbd>⌘T</Kbd>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger>
                    {#snippet child({ props })}
                        <Button
                            class="col-start-1"
                            variant="outline"
                            size="icon"
                            aria-label="Pan camera left"
                            {...props}
                        >
                            <ChevronLeft size={16} aria-hidden="true" />
                        </Button>
                    {/snippet}
                </TooltipTrigger>
                <TooltipContent side="left" class="px-2 py-1 text-xs">
                    Pan left
                    <Kbd>⌘L</Kbd>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <div class="flex items-center justify-center" aria-hidden="true">
            <Circle class="opacity-60" size={16} />
        </div>
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger>
                    {#snippet child({ props })}
                        <Button
                            variant="outline"
                            size="icon"
                            aria-label="Pan camera right"
                            {...props}
                        >
                            <ChevronRight size={16} aria-hidden="true" />
                        </Button>
                    {/snippet}
                </TooltipTrigger>
                <TooltipContent side="right" class="px-2 py-1 text-xs">
                    Pan right
                    <Kbd>⌘R</Kbd>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger>
                    {#snippet child({ props })}
                        <Button
                            class="col-start-2"
                            variant="outline"
                            size="icon"
                            aria-label="Pan camera down"
                            {...props}
                        >
                            <ChevronDown size={16} aria-hidden="true" />
                        </Button>
                    {/snippet}
                </TooltipTrigger>
                <TooltipContent side="bottom" class="px-2 py-1 text-xs">
                    Pan bottom

                    <Kbd>⌘B</Kbd>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
</ComponentPreviewTabs>
