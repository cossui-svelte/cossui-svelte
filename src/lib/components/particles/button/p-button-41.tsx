"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    window.setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Button loading={isLoading} onClick={handleClick}>
      Submit
    </Button>
  );
}
