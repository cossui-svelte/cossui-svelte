import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/registry/default/ui/stepper";

const steps = [1, 2, 3, 4];

export default function Component() {
  return (
    <div className="space-y-8 text-center">
      <Stepper defaultValue={2} orientation="vertical">
        {steps.map((step) => (
          <StepperItem className="not-last:flex-1" key={step} step={step}>
            <StepperTrigger>
              <StepperIndicator />
            </StepperTrigger>
            {step < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
      <p
        aria-live="polite"
        className="mt-2 text-muted-foreground text-xs"
        role="region"
      >
        Vertical stepper with numbers and checkmarks
      </p>
    </div>
  );
}
