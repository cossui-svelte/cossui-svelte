import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/default/ui/input-group";

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupInput
        aria-label="Enter your domain"
        className="*:[input]:px-0!"
        placeholder="coss"
        type="text"
      />
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
