import { OTPField, OTPFieldInput } from "@/registry/default/ui/otp-field";

const OTP_LENGTH = 4;

const OTP_SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, i) => `otp-slot-${i}`,
);

export default function Particle() {
  return (
    <OTPField aria-label="One-time password" length={OTP_LENGTH} size="lg">
      {OTP_SLOT_KEYS.map((slotKey, index) => (
        <OTPFieldInput
          key={slotKey}
          aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
        />
      ))}
    </OTPField>
  );
}
