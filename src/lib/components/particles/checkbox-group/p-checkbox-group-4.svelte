<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { CheckboxGroup } from "$lib/components/ui/checkbox-group";
  import { Label } from "$lib/components/ui/label";

  const mainPermissions = [
    { id: "view-dashboard", name: "View Dashboard" },
    { id: "manage-users", name: "Manage Users" },
    { id: "access-reports", name: "Access Reports" },
  ];

  const userManagementPermissions = [
    { id: "create-user", name: "Create User" },
    { id: "edit-user", name: "Edit User" },
    { id: "delete-user", name: "Delete User" },
    { id: "assign-roles", name: "Assign Roles" },
  ];

  const allMainIds = mainPermissions.map((p) => p.id);
  const allMgmtIds = userManagementPermissions.map((p) => p.id);

  let mainValue = $state<string[]>([]);
  let managementValue = $state<string[]>([]);

  let mgmtIsPartial = $derived(
    managementValue.length > 0 && managementValue.length < allMgmtIds.length,
  );
  let rootChecked = $derived(mainValue.length === allMainIds.length);
  let rootIndeterminate = $derived(
    mainValue.length > 0 && mainValue.length < allMainIds.length,
  );
  let mgmtParentChecked = $derived(managementValue.length === allMgmtIds.length);
  let mgmtParentIndeterminate = $derived(mgmtIsPartial);

  function toggleRoot() {
    if (rootChecked) {
      mainValue = [];
      managementValue = [];
    } else {
      mainValue = [...allMainIds];
      managementValue = [...allMgmtIds];
    }
  }

  function onMainValueChange(v: string[]) {
    if (v.includes("manage-users")) {
      managementValue = [...allMgmtIds];
    } else if (managementValue.length === allMgmtIds.length) {
      managementValue = [];
    }
    mainValue = v;
  }

  function toggleMgmtParent() {
    if (mgmtParentChecked) {
      managementValue = [];
      mainValue = mainValue.filter((v) => v !== "manage-users");
    } else {
      managementValue = [...allMgmtIds];
      mainValue = Array.from(new Set([...mainValue, "manage-users"]));
    }
  }

  function onMgmtValueChange(v: string[]) {
    if (v.length === allMgmtIds.length) {
      mainValue = Array.from(new Set([...mainValue, "manage-users"]));
    } else {
      mainValue = mainValue.filter((mv) => mv !== "manage-users");
    }
    managementValue = v;
  }
</script>

<CheckboxGroup
  aria-labelledby="user-permissions-caption"
  value={mainValue}
  onValueChange={onMainValueChange}
>
  <Label id="user-permissions-caption">
    <Checkbox
      checked={rootChecked}
      indeterminate={rootIndeterminate}
      onCheckedChange={toggleRoot}
    />
    User Permissions
  </Label>

  {#each mainPermissions.filter((p) => p.id !== "manage-users") as p (p.id)}
    <Label class="ms-4">
      <Checkbox value={p.id} />
      {p.name}
    </Label>
  {/each}

  <CheckboxGroup
    aria-labelledby="manage-users-caption"
    class="ms-4"
    value={managementValue}
    onValueChange={onMgmtValueChange}
  >
    <Label id="manage-users-caption">
      <Checkbox
        checked={mgmtParentChecked}
        indeterminate={mgmtParentIndeterminate}
        onCheckedChange={toggleMgmtParent}
      />
      Manage Users
    </Label>
    {#each userManagementPermissions as p (p.id)}
      <Label class="ms-4">
        <Checkbox value={p.id} />
        {p.name}
      </Label>
    {/each}
  </CheckboxGroup>
</CheckboxGroup>
