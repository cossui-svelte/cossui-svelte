<script lang="ts">
  import { Group, GroupSeparator } from '#lib/components/ui/group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue
  } from '#lib/components/ui/select/index.js';

  const protocols = [
    { label: 'https://', value: 'https' },
    { label: 'http://', value: 'http' },
    { label: 'ftp://', value: 'ftp' },
    { label: 'sftp://', value: 'sftp' }
  ];

  let protocol = $state('https');
</script>

<Group aria-label="URL input">
  <Select bind:value={protocol}>
    <SelectTrigger class="w-fit min-w-none">
      <SelectValue />
    </SelectTrigger>
    <SelectPopup>
      {#each protocols as p (p.value)}
        <SelectItem value={p.value}>{p.label}</SelectItem>
      {/each}
    </SelectPopup>
  </Select>
  <GroupSeparator />
  <Input aria-label="IP address" placeholder="192.168.1.1" type="text" />
</Group>
