"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from "@/registry/default/ui/stepper";

const steps = [1, 2, 3, 4];

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="mx-auto max-w-xl space-y-8 text-center">
      <div className="space-y-3">
        <Stepper onValueChange={setCurrentStep} value={currentStep}>
          {steps.map((step) => (
            <StepperItem className="flex-1" key={step} step={step}>
              <StepperTrigger
                asChild
                className="w-full flex-col items-start gap-2"
              >
                <StepperIndicator
                  asChild
                  className="h-2 w-full rounded-none bg-border"
                >
                  <span className="sr-only">{step}</span>
                </StepperIndicator>
              </StepperTrigger>
            </StepperItem>
          ))}
        </Stepper>
        <div className="font-medium text-muted-foreground text-sm tabular-nums">
          Step {currentStep} of {steps.length}
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          className="w-32"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => prev - 1)}
          variant="outline"
        >
          Prev step
        </Button>
        <Button
          className="w-32"
          disabled={currentStep >= steps.length}
          onClick={() => setCurrentStep((prev) => prev + 1)}
          variant="outline"
        >
          Next step
        </Button>
      </div>
      <p
        aria-live="polite"
        className="mt-2 text-muted-foreground text-xs"
        role="region"
      >
        Progress stepper
      </p>
    </div>
  );
}
