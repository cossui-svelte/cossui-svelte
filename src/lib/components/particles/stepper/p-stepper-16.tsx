"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/registry/default/ui/stepper";

const steps = [1, 2, 3, 4];

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="space-y-8 text-center">
      <Stepper
        onValueChange={setCurrentStep}
        orientation="vertical"
        value={currentStep}
      >
        {steps.map((step) => (
          <StepperItem className="not-last:flex-1" key={step} step={step}>
            <StepperTrigger asChild>
              <StepperIndicator />
            </StepperTrigger>
            {step < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
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
          disabled={currentStep > steps.length}
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
        Controlled vertical stepper with checkmarks
      </p>
    </div>
  );
}
