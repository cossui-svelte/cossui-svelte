<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button";
    import {
        InputGroup,
        InputGroupAddon,
        InputGroupInput,
        InputGroupText,
    } from "$lib/components/ui/input-group";
    import { Kbd } from "$lib/components/ui/kbd";
    import { Label } from "$lib/components/ui/label";
    import {
        Popover,
        PopoverPopup,
        PopoverTrigger,
    } from "$lib/components/ui/popover";
    import {
        Tooltip,
        TooltipPopup,
        TooltipTrigger,
    } from "$lib/components/ui/tooltip";
    import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
    import CheckIcon from "@lucide/svelte/icons/check";
    import CopyIcon from "@lucide/svelte/icons/copy";
    import InfoIcon from "@lucide/svelte/icons/info";
    import SearchIcon from "@lucide/svelte/icons/search";
</script>

<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput
            aria-label="Search"
            placeholder="Search"
            type="search"
        />
        <InputGroupAddon>
            <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput
            aria-label="Search"
            placeholder="Search"
            size="sm"
            type="search"
        />
        <InputGroupAddon>
            <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput
            aria-label="Search"
            placeholder="Search"
            size="lg"
            type="search"
        />
        <InputGroupAddon>
            <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput
            aria-label="Choose a username"
            placeholder="Choose a username"
            type="text"
        />
        <InputGroupAddon align="inline-end">
            <InputGroupText>@coss.ui</InputGroupText>
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput
            aria-label="Enter your domain"
            class="*:[input]:px-0!"
            placeholder="coss"
            type="text"
        />
        <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
            <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput
            aria-label="Subscribe to our newsletter"
            disabled
            placeholder="Your best email"
            type="email"
        />
        <InputGroupAddon align="inline-end">
            <Button
                aria-label="Subscribe"
                disabled
                size="icon-xs"
                variant="ghost"
            >
                <ArrowRightIcon aria-hidden="true" />
            </Button>
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput id="email-1" placeholder="team@coss.ui" type="email" />
        <InputGroupAddon align="block-start">
            <Label class="text-foreground" for="email-1">Email</Label>
            <Popover>
                <PopoverTrigger class="ml-auto" openOnHover>
                    <Button class="-m-1" size="icon-xs" variant="ghost">
                        <InfoIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverPopup side="top" tooltipStyle>
                    <p>We&apos;ll use this to send you notifications</p>
                </PopoverPopup>
            </Popover>
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput placeholder="Search…" type="search" />
        <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput placeholder="Type to search…" type="search" />
        <InputGroupAddon align="inline-end">
            <Badge variant="info">Badge</Badge>
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput placeholder="Type to search…" type="search" />
        <InputGroupAddon align="inline-end">
            <Button size="xs" variant="secondary">Search</Button>
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
    <InputGroup>
        <InputGroupInput
            aria-label="Password"
            placeholder="Password"
            type="password"
        />
        <InputGroupAddon align="inline-end">
            <Popover>
                <PopoverTrigger openOnHover>
                    <Button
                        aria-label="Password requirements"
                        size="icon-xs"
                        variant="ghost"
                    >
                        <InfoIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverPopup side="top" tooltipStyle>
                    <p>Min. 8 characters</p>
                </PopoverPopup>
            </Popover>
        </InputGroupAddon>
    </InputGroup>
</ComponentPreviewTabs>
