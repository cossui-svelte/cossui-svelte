<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Frame } from "$lib/components/ui/frame";
  import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";

  type Status = "Paid" | "Unpaid" | "Pending" | "Failed";

  type Project = {
    id: string;
    project: string;
    status: Status;
    team: string;
    budget: number;
  };

  const data: Project[] = [
    { budget: 12500, id: "1", project: "Website Redesign", status: "Paid", team: "Frontend Team" },
    { budget: 8750, id: "2", project: "Mobile App", status: "Unpaid", team: "Mobile Team" },
    { budget: 5200, id: "3", project: "API Integration", status: "Pending", team: "Backend Team" },
    { budget: 3800, id: "4", project: "Database Migration", status: "Paid", team: "DevOps Team" },
    { budget: 7200, id: "5", project: "User Dashboard", status: "Paid", team: "UX Team" },
    { budget: 2100, id: "6", project: "Security Audit", status: "Failed", team: "Security Team" },
  ];

  function getStatusColor(status: Status) {
    switch (status) {
      case "Paid":
        return "bg-emerald-500";
      case "Unpaid":
        return "bg-muted-foreground/64";
      case "Pending":
        return "bg-amber-500";
      case "Failed":
        return "bg-red-500";
    }
  }

  let rowSelection = $state<Record<string, boolean>>({});

  const isAllSelected = $derived(data.every((row) => rowSelection[row.id]));
  const isSomeSelected = $derived(data.some((row) => rowSelection[row.id]));

  function toggleAll(value: boolean) {
    for (const row of data) rowSelection[row.id] = value;
  }

  const totalBudget = data.reduce((sum, project) => sum + project.budget, 0);
  const formattedTotal = new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: "currency",
  }).format(totalBudget);
</script>

<Frame class="w-full">
  <Table variant="card">
    <TableHeader>
      <TableRow>
        <TableHead>
          <Checkbox
            aria-label="Select all"
            checked={isAllSelected}
            indeterminate={isSomeSelected && !isAllSelected}
            onCheckedChange={(v) => toggleAll(!!v)}
          />
        </TableHead>
        <TableHead>Project</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Team</TableHead>
        <TableHead class="text-right">Budget</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each data as row (row.id)}
        <TableRow data-state={rowSelection[row.id] ? "selected" : undefined}>
          <TableCell>
            <Checkbox
              aria-label="Select row"
              checked={!!rowSelection[row.id]}
              onCheckedChange={(v) => (rowSelection[row.id] = !!v)}
            />
          </TableCell>
          <TableCell class="font-medium">{row.project}</TableCell>
          <TableCell>
            <Badge variant="outline">
              <span aria-hidden="true" class={`size-1.5 rounded-full ${getStatusColor(row.status)}`}></span>
              {row.status}
            </Badge>
          </TableCell>
          <TableCell>{row.team}</TableCell>
          <TableCell class="text-right">
            {new Intl.NumberFormat("en-US", {
              currency: "USD",
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
              style: "currency",
            }).format(row.budget)}
          </TableCell>
        </TableRow>
      {/each}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colspan={4}>Total Budget</TableCell>
        <TableCell class="text-right">{formattedTotal}</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</Frame>
