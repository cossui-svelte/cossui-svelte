"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
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
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className="mx-auto max-w-xl space-y-8 text-center">
      <div className="flex items-center gap-2">
        <Button
          aria-label="Prev step"
          className="shrink-0"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => prev - 1)}
          size="icon"
          variant="ghost"
        >
          <ChevronLeftIcon aria-hidden="true" size={16} />
        </Button>
        <Stepper
          className="gap-1"
          onValueChange={setCurrentStep}
          value={currentStep}
        >
          {steps.map((step) => (
            <StepperItem className="flex-1" key={step} step={step}>
              <StepperTrigger
                asChild
                className="w-full flex-col items-start gap-2"
              >
                <StepperIndicator asChild className="h-1 w-full bg-border">
                  <span className="sr-only">{step}</span>
                </StepperIndicator>
              </StepperTrigger>
            </StepperItem>
          ))}
        </Stepper>
        <Button
          aria-label="Next step"
          className="shrink-0"
          disabled={currentStep === steps.length}
          onClick={() => setCurrentStep((prev) => prev + 1)}
          size="icon"
          variant="ghost"
        >
          <ChevronRightIcon aria-hidden="true" size={16} />
        </Button>
      </div>
      <p
        aria-live="polite"
        className="mt-2 text-muted-foreground text-xs"
        role="region"
      >
        Paginated stepper
      </p>
    </div>
  );
}
