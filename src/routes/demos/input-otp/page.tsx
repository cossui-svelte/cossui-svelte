"use client";

import { useId, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "$lib/components/ui/input-otp";
import { Label } from "$lib/components/ui/label";

export default function Particle() {
  const id = useId();
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState(false);
  const valid = value.length === 6 && value === "123456";

  return (
    <div className="flex flex-col items-center gap-2">
      <Label htmlFor={id}>Verification code</Label>
      <InputOTP
        aria-label="Verification code"
        id={id}
        maxLength={6}
        onChange={(nextValue) => {
          setValue(nextValue);
          setInvalid(nextValue.length === 6 ? nextValue !== "123456" : false);
        }}
        value={value}
      >
        <InputOTPGroup>
          <InputOTPSlot aria-invalid={invalid || undefined} index={0} />
          <InputOTPSlot aria-invalid={invalid || undefined} index={1} />
          <InputOTPSlot aria-invalid={invalid || undefined} index={2} />
          <InputOTPSlot aria-invalid={invalid || undefined} index={3} />
          <InputOTPSlot aria-invalid={invalid || undefined} index={4} />
          <InputOTPSlot aria-invalid={invalid || undefined} index={5} />
        </InputOTPGroup>
      </InputOTP>
      {!valid && !invalid && (
        <p className="text-muted-foreground text-xs">
          Enter `123456` to pass validation.
        </p>
      )}
      {invalid && (
        <p className="text-destructive-foreground text-xs">
          Code must be 123456.
        </p>
      )}
      {valid && (
        <p className="text-success-foreground text-xs">Code verified.</p>
      )}
    </div>
  );
}
