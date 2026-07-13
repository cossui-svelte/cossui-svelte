<script lang="ts">
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import ChevronUp from "@lucide/svelte/icons/chevron-up";
  import PlaneTakeoff from "@lucide/svelte/icons/plane-takeoff";
  import { Badge } from "$lib/components/ui/badge";
  import { CardFrame, CardFrameFooter } from "$lib/components/ui/card";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "$lib/components/ui/pagination";
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
  } from "$lib/components/ui/select";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";
  import { cn } from "$lib/utils";

  type FlightStatus = "On Time" | "Delayed" | "Cancelled" | "Boarding";

  type Flight = {
    id: string;
    flightCode: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    terminal: string;
    duration: string;
    status: FlightStatus;
    gate: string;
  };

  function getStatusColor(status: FlightStatus) {
    switch (status) {
      case "On Time":
        return "bg-emerald-500";
      case "Delayed":
        return "bg-amber-500";
      case "Cancelled":
        return "bg-red-500";
      case "Boarding":
        return "bg-blue-500";
      default:
        return "bg-muted-foreground/64";
    }
  }

  const flights: Flight[] = [
    { arrivalTime: "11:45", departureTime: "08:30", destination: "Los Angeles", duration: "5h 15m", flightCode: "AA1234", gate: "A12", id: "1", status: "On Time", terminal: "1" },
    { arrivalTime: "17:10", departureTime: "14:20", destination: "San Francisco", duration: "4h 50m", flightCode: "DL5678", gate: "B24", id: "2", status: "Delayed", terminal: "2" },
    { arrivalTime: "13:30", departureTime: "10:15", destination: "Miami", duration: "3h 15m", flightCode: "UA9012", gate: "C8", id: "3", status: "On Time", terminal: "1" },
    { arrivalTime: "18:20", departureTime: "16:45", destination: "Seattle", duration: "2h 35m", flightCode: "SW3456", gate: "D15", id: "4", status: "On Time", terminal: "3" },
    { arrivalTime: "12:30", departureTime: "09:00", destination: "Salt Lake City", duration: "5h 30m", flightCode: "JB7890", gate: "E3", id: "5", status: "Cancelled", terminal: "2" },
    { arrivalTime: "14:15", departureTime: "11:30", destination: "Phoenix", duration: "2h 45m", flightCode: "AS2345", gate: "F7", id: "6", status: "On Time", terminal: "1" },
    { arrivalTime: "20:30", departureTime: "13:00", destination: "Las Vegas", duration: "5h 30m", flightCode: "HA6789", gate: "G12", id: "7", status: "Delayed", terminal: "2" },
    { arrivalTime: "09:00", departureTime: "07:15", destination: "Dallas", duration: "1h 45m", flightCode: "FX0123", gate: "H5", id: "8", status: "Boarding", terminal: "1" },
    { arrivalTime: "08:30", departureTime: "06:00", destination: "Denver", duration: "2h 30m", flightCode: "WN4567", gate: "I9", id: "9", status: "Boarding", terminal: "2" },
    { arrivalTime: "15:20", departureTime: "12:45", destination: "Portland", duration: "2h 35m", flightCode: "B61234", gate: "J14", id: "10", status: "On Time", terminal: "3" },
    { arrivalTime: "18:45", departureTime: "15:30", destination: "Atlanta", duration: "3h 15m", flightCode: "NK8901", gate: "K6", id: "11", status: "On Time", terminal: "1" },
    { arrivalTime: "12:00", departureTime: "09:45", destination: "Chicago", duration: "2h 15m", flightCode: "F92345", gate: "L11", id: "12", status: "Delayed", terminal: "2" },
    { arrivalTime: "14:15", departureTime: "11:00", destination: "Boston", duration: "3h 15m", flightCode: "SY6789", gate: "M3", id: "13", status: "On Time", terminal: "1" },
    { arrivalTime: "16:45", departureTime: "13:30", destination: "New York", duration: "3h 15m", flightCode: "G40123", gate: "N8", id: "14", status: "On Time", terminal: "3" },
    { arrivalTime: "11:20", departureTime: "08:00", destination: "Washington", duration: "3h 20m", flightCode: "YX5678", gate: "O12", id: "15", status: "Delayed", terminal: "2" },
    { arrivalTime: "13:50", departureTime: "10:30", destination: "Orlando", duration: "3h 20m", flightCode: "4U9012", gate: "P5", id: "16", status: "Delayed", terminal: "1" },
    { arrivalTime: "16:30", departureTime: "14:00", destination: "Houston", duration: "2h 30m", flightCode: "QF3456", gate: "Q9", id: "17", status: "On Time", terminal: "3" },
    { arrivalTime: "10:00", departureTime: "07:30", destination: "Minneapolis", duration: "2h 30m", flightCode: "LH7890", gate: "R7", id: "18", status: "Cancelled", terminal: "2" },
    { arrivalTime: "19:30", departureTime: "16:15", destination: "Detroit", duration: "3h 15m", flightCode: "KL2345", gate: "S4", id: "19", status: "Cancelled", terminal: "1" },
    { arrivalTime: "15:10", departureTime: "12:00", destination: "Philadelphia", duration: "3h 10m", flightCode: "AF6789", gate: "T16", id: "20", status: "On Time", terminal: "3" },
    { arrivalTime: "12:25", departureTime: "09:15", destination: "Charlotte", duration: "3h 10m", flightCode: "BA0123", gate: "U10", id: "21", status: "On Time", terminal: "2" },
    { arrivalTime: "18:00", departureTime: "15:45", destination: "Nashville", duration: "2h 15m", flightCode: "IB4567", gate: "V8", id: "22", status: "Delayed", terminal: "1" },
    { arrivalTime: "14:00", departureTime: "11:45", destination: "Austin", duration: "2h 15m", flightCode: "EK8901", gate: "W13", id: "23", status: "Cancelled", terminal: "3" },
    { arrivalTime: "16:40", departureTime: "13:15", destination: "Tampa", duration: "3h 25m", flightCode: "QR2345", gate: "X6", id: "24", status: "On Time", terminal: "2" },
    { arrivalTime: "11:30", departureTime: "08:45", destination: "Raleigh", duration: "2h 45m", flightCode: "TK6789", gate: "Y11", id: "25", status: "On Time", terminal: "1" },
    { arrivalTime: "12:45", departureTime: "10:00", destination: "Indianapolis", duration: "2h 45m", flightCode: "VS3456", gate: "Z4", id: "26", status: "On Time", terminal: "2" },
    { arrivalTime: "20:00", departureTime: "17:30", destination: "Kansas City", duration: "2h 30m", flightCode: "LX7890", gate: "A8", id: "27", status: "Delayed", terminal: "3" },
    { arrivalTime: "15:20", departureTime: "12:30", destination: "Columbus", duration: "2h 50m", flightCode: "OS1234", gate: "B19", id: "28", status: "On Time", terminal: "1" },
    { arrivalTime: "20:15", departureTime: "18:00", destination: "Milwaukee", duration: "2h 15m", flightCode: "SN5678", gate: "C22", id: "29", status: "On Time", terminal: "2" },
    { arrivalTime: "21:30", departureTime: "19:15", destination: "Memphis", duration: "2h 15m", flightCode: "TP9012", gate: "D6", id: "30", status: "On Time", terminal: "3" },
  ];

  type SortId = "flightCode" | "departureTime" | "destination" | "status" | "terminal" | "gate";

  const columns: { id: SortId | "select"; header: string; size: number; sortable: boolean }[] = [
    { header: "", id: "select", size: 28, sortable: false },
    { header: "Flight", id: "flightCode", size: 80, sortable: true },
    { header: "Time", id: "departureTime", size: 220, sortable: true },
    { header: "Destination", id: "destination", size: 180, sortable: true },
    { header: "Status", id: "status", size: 120, sortable: true },
    { header: "Terminal", id: "terminal", size: 90, sortable: true },
    { header: "Gate", id: "gate", size: 80, sortable: true },
  ];

  let sort = $state<{ id: SortId; desc: boolean }>({ desc: false, id: "departureTime" });

  function toggleSort(id: SortId) {
    sort = sort.id === id ? { desc: !sort.desc, id } : { desc: false, id };
  }

  const sortedFlights = $derived(
    [...flights].sort((a, b) => {
      const av = a[sort.id];
      const bv = b[sort.id];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sort.desc ? -cmp : cmp;
    }),
  );

  const pageSize = 10;
  let selectedRange = $state("1");

  let pageIndex = $derived(Number(selectedRange) - 1);

  function goToPage(index: number) {
    selectedRange = String(index + 1);
  }

  const pageCount = $derived(Math.ceil(flights.length / pageSize));
  const pageRows = $derived(sortedFlights.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize));
  const canPreviousPage = $derived(pageIndex > 0);
  const canNextPage = $derived(pageIndex < pageCount - 1);

  const pageRanges = $derived(
    Array.from({ length: pageCount }, (_, i) => {
      const start = i * pageSize + 1;
      const end = Math.min((i + 1) * pageSize, flights.length);
      return { label: `${start}-${end}`, value: String(i + 1) };
    }),
  );

  let rowSelection = $state<Record<string, boolean>>({});

  const isAllPageSelected = $derived(pageRows.length > 0 && pageRows.every((row) => rowSelection[row.id]));
  const isSomePageSelected = $derived(pageRows.some((row) => rowSelection[row.id]));

  function togglePage(value: boolean) {
    for (const row of pageRows) rowSelection[row.id] = value;
  }
</script>

<CardFrame class="w-full">
  <Table class="table-fixed" variant="card">
    <TableHeader>
      <TableRow class="hover:bg-transparent">
        {#each columns as col (col.id)}
          <TableHead style={`width: ${col.size}px`}>
            {#if col.id === "select"}
              <Checkbox
                aria-label="Select all rows"
                checked={isAllPageSelected}
                indeterminate={isSomePageSelected && !isAllPageSelected}
                onCheckedChange={(v) => togglePage(!!v)}
              />
            {:else if col.sortable}
              <div
                class="flex h-full cursor-pointer select-none items-center justify-between gap-2"
                onclick={() => toggleSort(col.id as SortId)}
                onkeydown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleSort(col.id as SortId);
                  }
                }}
                role="button"
                tabindex={0}
              >
                {col.header}
                {#if sort.id === col.id}
                  {#if sort.desc}
                    <ChevronDown aria-hidden="true" class="size-4 shrink-0 opacity-80" />
                  {:else}
                    <ChevronUp aria-hidden="true" class="size-4 shrink-0 opacity-80" />
                  {/if}
                {/if}
              </div>
            {:else}
              {col.header}
            {/if}
          </TableHead>
        {/each}
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each pageRows as flight (flight.id)}
        <TableRow data-state={rowSelection[flight.id] ? "selected" : undefined}>
          <TableCell>
            <Checkbox
              aria-label="Select row"
              checked={!!rowSelection[flight.id]}
              onCheckedChange={(v) => (rowSelection[flight.id] = !!v)}
            />
          </TableCell>
          <TableCell>
            <div class="font-medium font-mono text-muted-foreground">{flight.flightCode}</div>
          </TableCell>
          <TableCell>
            <div
              class={cn(
                "flex items-center gap-1.5 font-normal tabular-nums",
                flight.status === "Cancelled" && "text-muted-foreground line-through opacity-50",
              )}
            >
              <div class={flight.status === "Delayed" ? "text-warning-foreground" : undefined}>
                {flight.departureTime}
              </div>
              <div
                aria-hidden="true"
                class="flex items-center gap-0.5 opacity-50 before:size-1.5 before:rounded-full before:border before:border-muted-foreground after:h-px after:w-3 after:border-muted-foreground after:border-t after:border-dashed"
              ></div>
              <div class={cn("text-muted-foreground", flight.status === "Cancelled" && "line-through")}>
                {flight.duration}
              </div>
              <div
                aria-hidden="true"
                class="flex items-center gap-0.5 opacity-50 before:order-1 before:size-1.5 before:rounded-full before:border before:border-muted-foreground after:h-px after:w-3 after:border-muted-foreground after:border-t after:border-dashed"
              ></div>
              <div>{flight.arrivalTime}</div>
            </div>
          </TableCell>
          <TableCell>
            <div class="font-medium">{flight.destination}</div>
          </TableCell>
          <TableCell>
            <Badge variant="outline">
              <span aria-hidden="true" class={cn("size-1.5 rounded-full", getStatusColor(flight.status))}></span>
              {flight.status}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge class="font-normal tabular-nums" size="lg" variant="outline">
              <PlaneTakeoff />
              <span>{flight.terminal}</span>
            </Badge>
          </TableCell>
          <TableCell>{flight.gate}</TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
  <CardFrameFooter class="p-2">
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2 whitespace-nowrap">
        <p class="text-muted-foreground text-sm">Viewing</p>
        <Select bind:value={selectedRange} items={pageRanges}>
          <SelectTrigger aria-label="Select result range" class="w-fit min-w-none" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {#each pageRanges as { label, value } (value)}
              <SelectItem {value}>{label}</SelectItem>
            {/each}
          </SelectPopup>
        </Select>
        <p class="text-muted-foreground text-sm">
          of <strong class="font-medium text-foreground">{flights.length}</strong> results
        </p>
      </div>

      <Pagination class="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              class="sm:*:[svg]:hidden"
              href="#"
              isDisabled={!canPreviousPage}
              onclick={(e: MouseEvent) => {
                e.preventDefault();
                if (canPreviousPage) goToPage(pageIndex - 1);
              }}
              size="sm"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              class="sm:*:[svg]:hidden"
              href="#"
              isDisabled={!canNextPage}
              onclick={(e: MouseEvent) => {
                e.preventDefault();
                if (canNextPage) goToPage(pageIndex + 1);
              }}
              size="sm"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </CardFrameFooter>
</CardFrame>
