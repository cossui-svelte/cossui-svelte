<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { CardFrame } from "$lib/components/ui/card";
  import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";
</script>

<CardFrame class="w-full">
  <Table variant="card">
    <TableHeader>
      <TableRow>
        <TableHead>Project</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Team</TableHead>
        <TableHead class="text-right">Budget</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium">Website Redesign</TableCell>
        <TableCell>
          <Badge variant="outline">
            <span aria-hidden="true" class="size-1.5 rounded-full bg-emerald-500"></span>
            Paid
          </Badge>
        </TableCell>
        <TableCell>Frontend Team</TableCell>
        <TableCell class="text-right">$12,500</TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium">Mobile App</TableCell>
        <TableCell>
          <Badge variant="outline">
            <span aria-hidden="true" class="size-1.5 rounded-full bg-muted-foreground/64"></span>
            Unpaid
          </Badge>
        </TableCell>
        <TableCell>Mobile Team</TableCell>
        <TableCell class="text-right">$8,750</TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium">API Integration</TableCell>
        <TableCell>
          <Badge variant="outline">
            <span aria-hidden="true" class="size-1.5 rounded-full bg-amber-500"></span>
            Pending
          </Badge>
        </TableCell>
        <TableCell>Backend Team</TableCell>
        <TableCell class="text-right">$5,200</TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium">Database Migration</TableCell>
        <TableCell>
          <Badge variant="outline">
            <span aria-hidden="true" class="size-1.5 rounded-full bg-emerald-500"></span>
            Paid
          </Badge>
        </TableCell>
        <TableCell>DevOps Team</TableCell>
        <TableCell class="text-right">$3,800</TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium">User Dashboard</TableCell>
        <TableCell>
          <Badge variant="outline">
            <span aria-hidden="true" class="size-1.5 rounded-full bg-emerald-500"></span>
            Paid
          </Badge>
        </TableCell>
        <TableCell>UX Team</TableCell>
        <TableCell class="text-right">$7,200</TableCell>
      </TableRow>
      <TableRow>
        <TableCell class="font-medium">Security Audit</TableCell>
        <TableCell>
          <Badge variant="outline">
            <span aria-hidden="true" class="size-1.5 rounded-full bg-red-500"></span>
            Failed
          </Badge>
        </TableCell>
        <TableCell>Security Team</TableCell>
        <TableCell class="text-right">$2,100</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colspan={3}>Total Budget</TableCell>
        <TableCell class="text-right">$39,550</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</CardFrame>
