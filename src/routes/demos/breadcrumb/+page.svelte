<script>
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
    import {
        Breadcrumb,
        BreadcrumbEllipsis,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbList,
        BreadcrumbPage,
        BreadcrumbSeparator,
    } from "$lib/components/ui/breadcrumb";
    import { Button } from "$lib/components/ui/button";
    import {
        Menu,
        MenuItem,
        MenuPopup,
        MenuTrigger,
    } from "$lib/components/ui/menu";
</script>

<ComponentPreviewTabs>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink><a href="/">Home</a></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <Menu>
                    <MenuTrigger>
                        <Button
                            class="-m-1.5 text-muted-foreground"
                            size="icon-sm"
                            variant="ghost"
                        >
                            <BreadcrumbEllipsis />
                        </Button>
                    </MenuTrigger>
                    <MenuPopup align="start">
                        <MenuItem><a href="/docs">Docs</a></MenuItem>
                        <MenuItem><a href="/particles">Particles</a></MenuItem>
                    </MenuPopup>
                </Menu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink>
                    <a href="/docs/">Components</a>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
</ComponentPreviewTabs>
