<script lang="ts">
    import {
        TextAlignCenter,
        TextAlignStart,
        TextAlignEnd,
        DollarSignIcon,
        PercentIcon,
    } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import {
        Select,
        SelectItem,
        SelectPopup,
        SelectTrigger,
        SelectValue,
    } from "$lib/components/ui/select";
    import {
        ToggleGroup,
        ToggleGroupItem,
    } from "$lib/components/ui/toggle-group";
    import {
        Toolbar,
        ToolbarButton,
        ToolbarGroup,
        ToolbarSeparator,
    } from "$lib/components/ui/toolbar";
    import {
        Tooltip,
        TooltipPopup,
        TooltipProvider,
        TooltipTrigger,
    } from "$lib/components/ui/tooltip";

    const items = [
        { label: "Helvetica", value: "helvetica" },
        { label: "Arial", value: "arial" },
        { label: "Times New Roman", value: "times-new-roman" },
    ];
</script>

<TooltipProvider>
    <Toolbar>
        <ToggleGroup class="border-none p-0" value={["left"]}>
            <Tooltip>
                <TooltipTrigger>
                    <ToolbarButton aria-label="Align left">
                        <ToggleGroupItem value="left" />
                        <TextAlignStart />
                    </ToolbarButton>
                </TooltipTrigger>
                <TooltipPopup sideOffset={8}>Align left</TooltipPopup>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <ToolbarButton aria-label="Align center">
                        <ToggleGroupItem
                            aria-label="Toggle center"
                            value="center"
                        />

                        <TextAlignCenter />
                    </ToolbarButton>
                </TooltipTrigger>
                <TooltipPopup sideOffset={8}>Align center</TooltipPopup>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <ToolbarButton aria-label="Align right">
                        <ToggleGroupItem
                            aria-label="Toggle right"
                            value="right"
                        >
                            <TextAlignEnd /></ToggleGroupItem
                        >
                    </ToolbarButton>
                </TooltipTrigger>
                <TooltipPopup sideOffset={8}>Align right</TooltipPopup>
            </Tooltip>
        </ToggleGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
            <Tooltip>
                <TooltipTrigger>
                    <ToolbarButton aria-label="Format as currency">
                        <Button size="icon" variant="ghost">
                            <DollarSignIcon /></Button
                        >
                    </ToolbarButton>
                </TooltipTrigger>
                <TooltipPopup sideOffset={8}>Format as currency</TooltipPopup>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <ToolbarButton aria-label="Format as percent">
                        <Button size="icon" variant="ghost">
                            <PercentIcon /></Button
                        >
                    </ToolbarButton>
                </TooltipTrigger>
                <TooltipPopup sideOffset={8}>Format as percent</TooltipPopup>
            </Tooltip>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
            <Select value={["helvetica"]} {items}>
                <Tooltip>
                    <TooltipTrigger>
                        <ToolbarButton>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                        </ToolbarButton>
                    </TooltipTrigger>
                    <TooltipPopup sideOffset={8}>
                        Select a different font
                    </TooltipPopup>
                </Tooltip>
                <SelectPopup>
                    <!-- {items.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))} -->
                </SelectPopup>
            </Select>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
            <ToolbarButton>
                <Button>Save</Button>
            </ToolbarButton>
        </ToolbarGroup>
    </Toolbar>
</TooltipProvider>
