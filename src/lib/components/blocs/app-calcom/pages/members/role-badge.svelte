<script lang="ts">
  import { type MemberRole, PRIVILEGED_ROLES } from './members-data.js';
  import TruncatedBadge from './truncated-badge.svelte';

  let { role }: { role: MemberRole } = $props();
</script>

<TruncatedBadge variant={PRIVILEGED_ROLES.includes(role) ? 'info' : 'secondary'}>
  {role}
</TruncatedBadge>
