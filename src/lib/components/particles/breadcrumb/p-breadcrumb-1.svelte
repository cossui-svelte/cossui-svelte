<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from '#lib/components/ui/breadcrumb/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Menu, MenuLinkItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
</script>

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <Menu>
        <MenuTrigger
          class={`${buttonVariants({ size: 'icon-sm', variant: 'ghost' })}·-m-1.5·text-muted-foreground`}
        >
          <BreadcrumbEllipsis />
        </MenuTrigger>
        <MenuPopup align="start">
          <MenuLinkItem href="/docs">Docs</MenuLinkItem>
          <MenuLinkItem href="/particles">Particles</MenuLinkItem>
        </MenuPopup>
      </Menu>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs/">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
