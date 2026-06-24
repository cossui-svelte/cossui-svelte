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
    <Button onClick={handleCopy} variant="outline">
      {copied ? (
        <>
          <CheckIcon aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <CopyIcon aria-hidden="true" />
          Copy
        </>
      )}
    </Button>
  );
}
