import { ComponentPreviewTabs } from "@/components/component-preview-tabs";
import { ComponentSource } from "@/components/component-source";
import { cn } from "@/lib/utils";
import { Index } from "@/registry/__index__";

interface ComponentPreviewProps
  extends Omit<React.ComponentProps<"div">, "ref"> {
  name: string;
  align?: "center" | "start" | "end";
  description?: string;
  hideCode?: boolean;
}

export function ComponentPreview({
  name,
  className,
  align = "center",
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const Component = Index[name]?.component;
  const metaClassName = Index[name]?.meta?.className;

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[.8125rem]">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );
  }

  return (
    <ComponentPreviewTabs
      align={align}
      className={cn(metaClassName, className)}
      component={<Component />}
      hideCode={hideCode}
      source={<ComponentSource collapsible={false} name={name} />}
      {...props}
    />
  );
}
