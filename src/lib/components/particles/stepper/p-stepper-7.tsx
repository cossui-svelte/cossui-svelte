import { Shuffle } from "lucide-react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/registry/default/ui/stepper";

export default function Component() {
  return (
    <div className="mx-auto max-w-xl space-y-8 text-center">
      <Stepper defaultValue={2}>
        <StepperItem className="not-last:flex-1" step={1}>
          <StepperTrigger>
            <StepperIndicator asChild>
              <img
                alt="Mike Palmer"
                className="rounded-full"
                height={32}
                src="/origin/avatar-40-05.jpg"
                width={32}
              />
            </StepperIndicator>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem className="not-last:flex-1" loading step={2}>
          <StepperTrigger>
            <StepperIndicator />
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem className="not-last:flex-1" step={3}>
          <StepperTrigger>
            <StepperIndicator asChild>
              <Shuffle aria-hidden="true" size={14} />
              <span className="sr-only">Shuffle</span>
            </StepperIndicator>
          </StepperTrigger>
        </StepperItem>
      </Stepper>
      <p
        aria-live="polite"
        className="mt-2 text-muted-foreground text-xs"
        role="region"
      >
        Stepper with mixed elements
      </p>
    </div>
  );
}
