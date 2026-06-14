<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";

    import Circle from "@lucide/svelte/icons/circle";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import ChevronLeft from "@lucide/svelte/icons/chevron-left";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    import ChevronUp from "@lucide/svelte/icons/chevron-up";
    import {
        Tooltip,
        TooltipContent,
        TooltipPopup,
        TooltipProvider,
        TooltipTrigger,
    } from "$lib/components/ui/tooltip";
    import { Kbd, KbdGroup } from "$lib/components/ui/kbd";
    import { BoldIcon, ItalicIcon, UnderlineIcon } from "@lucide/svelte";
    import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
</script>

<ComponentPreviewTabs>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                {#snippet child({ props })}
                    <Button variant="outline" {...props}>Hover me</Button>
                {/snippet}
            </TooltipTrigger>
            <TooltipPopup>Helpful hint</TooltipPopup>
        </Tooltip>
    </TooltipProvider>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <TooltipProvider>
        <ToggleGroup value={["bold"]} type="multiple">
            <Tooltip>
                <TooltipTrigger>
                    {#snippet child({ props })}
                        <ToggleGroupItem aria-label="Toggle bold" value="bold" {...props}>
                            <BoldIcon />
                        </ToggleGroupItem>
                    {/snippet}
                </TooltipTrigger>
                <TooltipPopup>Bold</TooltipPopup>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    {#snippet child({ props })}
                        <ToggleGroupItem aria-label="Toggle italic" value="italic" {...props}>
                            <ItalicIcon />
                        </ToggleGroupItem>
                    {/snippet}
                </TooltipTrigger>
                <TooltipPopup>Italic</TooltipPopup>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    {#snippet child({ props })}
                        <ToggleGroupItem aria-label="Toggle underline" value="underline" {...props}>
                            <UnderlineIcon />
                        </ToggleGroupItem>
                    {/snippet}
                </TooltipTrigger>
                <TooltipPopup>Underline</TooltipPopup>
            </Tooltip>
        </ToggleGroup>
    </TooltipProvider>
</ComponentPreviewTabs>


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
