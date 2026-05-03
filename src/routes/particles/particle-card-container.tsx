import {
  Card,
  CardFrame,
  CardFrameFooter,
  CardPanel,
} from "@/registry/default/ui/card";
import { cn } from "@/lib/utils";

export function ParticleCardContainer({
  children,
  className,
  colSpan,
  footer,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  footer: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex min-w-0",
        colSpan === 2 && "lg:col-span-2",
        className,
      )}
    >
      <CardFrame className="w-full after:pointer-events-none after:absolute after:-inset-[5px] after:-z-1 after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/64 dark:bg-background">
        <Card className="min-h-50 flex-1 flex-col flex-wrap overflow-x-auto dark:bg-background">
          <CardPanel className="flex flex-1 items-center justify-center lg:px-8 lg:py-12">
            {children}
          </CardPanel>
        </Card>
        <CardFrameFooter className="flex items-center gap-3 p-2">
          {footer}
        </CardFrameFooter>
      </CardFrame>
    </div>
  );
}
