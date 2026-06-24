"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("Text copied!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      onClick={handleCopy}
      size="icon"
      variant="outline"
    >
      {copied ? (
        <CheckIcon aria-hidden="true" />
      ) : (
        <CopyIcon aria-hidden="true" />
      )}
    </Button>
  );
}
