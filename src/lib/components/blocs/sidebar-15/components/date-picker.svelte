<script lang="ts">
  import { Calendar } from '#lib/components/ui/calendar/index.js';
  import { SidebarGroup, SidebarGroupContent } from '#lib/components/ui/sidebar/index.js';
</script>

<SidebarGroup class="px-0">
  <SidebarGroupContent>
    <Calendar
      readonly
      mode="single"
      class="select-none [&_[data-calendar-head-cell]]:w-[33px] [&_[role=gridcell]]:w-[33px] [&_[role=gridcell]_[role=button][data-today]]:bg-sidebar-primary [&_[role=gridcell]_[role=button][data-today]]:text-sidebar-primary-foreground"
    />
  </SidebarGroupContent>
</SidebarGroup>
