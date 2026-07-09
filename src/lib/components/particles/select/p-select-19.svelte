<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import { Select, SelectGroup, SelectGroupLabel, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const users = [
    {
      avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=72&h=72&dpr=2&q=80",
      initials: "JH",
      label: "Jenny Hamilton",
      value: "jenny",
    },
    {
      avatar: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=72&h=72&dpr=2&q=80",
      initials: "PS",
      label: "Paul Smith",
      value: "paul",
    },
    {
      avatar: "https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=72&h=72&dpr=2&q=80",
      initials: "LW",
      label: "Luna Wyen",
      value: "luna",
    },
  ];

  let selected = $state("jenny");
  const selectedUser = $derived(users.find((u) => u.value === selected) ?? users[0]);
</script>

<Select value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger aria-label="Select user">
    <span class="flex items-center gap-2">
      <Avatar class="size-5">
        <AvatarImage alt={selectedUser.label} src={selectedUser.avatar} />
        <AvatarFallback class="text-[.625rem]">{selectedUser.initials}</AvatarFallback>
      </Avatar>
      <span class="truncate">{selectedUser.label}</span>
    </span>
  </SelectTrigger>
  <SelectPopup>
    <SelectGroup>
      <SelectGroupLabel>Impersonate user</SelectGroupLabel>
      {#each users as item (item.value)}
        <SelectItem value={item.value}>
          <span class="flex items-center gap-2">
            <Avatar class="size-5">
              <AvatarImage alt={item.label} src={item.avatar} />
              <AvatarFallback class="text-[10px]">{item.initials}</AvatarFallback>
            </Avatar>
            <span class="truncate">{item.label}</span>
          </span>
        </SelectItem>
      {/each}
    </SelectGroup>
  </SelectPopup>
</Select>
