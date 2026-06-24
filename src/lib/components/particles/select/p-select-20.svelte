<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const users = [
    {
      avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=72&h=72&dpr=2&q=80",
      initials: "JH",
      label: "Jenny Hamilton",
      username: "@jennycodes",
      value: "jenny",
    },
    {
      avatar: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=72&h=72&dpr=2&q=80",
      initials: "PS",
      label: "Paul Smith",
      username: "@paulsmith",
      value: "paul",
    },
    {
      avatar: "https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=72&h=72&dpr=2&q=80",
      initials: "LW",
      label: "Luna Wyen",
      username: "@wyen.luna",
      value: "luna",
    },
  ];

  let selected = $state("jenny");
  const selectedUser = $derived(users.find((u) => u.value === selected) ?? users[0]);
</script>

<Select aria-label="Select user" value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger class="h-auto py-1.5">
    <span class="flex items-center gap-2">
      <Avatar class="size-8">
        <AvatarImage alt={selectedUser.label} src={selectedUser.avatar} />
        <AvatarFallback>{selectedUser.initials}</AvatarFallback>
      </Avatar>
      <span class="flex flex-col text-left">
        <span class="truncate font-medium">{selectedUser.label}</span>
        <span class="truncate text-muted-foreground text-xs">{selectedUser.username}</span>
      </span>
    </span>
  </SelectTrigger>
  <SelectPopup>
    {#each users as item (item.value)}
      <SelectItem class="py-1.5" value={item.value}>
        <span class="flex items-center gap-2">
          <Avatar class="size-8">
            <AvatarImage alt={item.label} src={item.avatar} />
            <AvatarFallback>{item.initials}</AvatarFallback>
          </Avatar>
          <span class="flex flex-col">
            <span class="truncate font-medium">{item.label}</span>
            <span class="truncate text-muted-foreground text-xs">{item.username}</span>
          </span>
        </span>
      </SelectItem>
    {/each}
  </SelectPopup>
</Select>
