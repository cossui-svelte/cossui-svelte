import { DatabaseIcon } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const items = [
  { label: "Orion", value: "orion" },
  { label: "Sigma", value: "sigma" },
  { label: "Dorado", value: "dorado" },
];

export default function Particle() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />}>Databases</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Select
            aria-label="Select database"
            defaultValue="orion"
            items={items}
          >
            <SelectTrigger size="sm">
              <DatabaseIcon />
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {items.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
