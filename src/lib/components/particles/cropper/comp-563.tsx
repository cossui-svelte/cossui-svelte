"use client";

import React from "react";
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/registry/default/ui/cropper";

type Area = { x: number; y: number; width: number; height: number };

export default function Component() {
  const [cropData, setCropData] = React.useState<Area | null>(null);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-col gap-4">
        <Cropper
          className="h-80"
          cropPadding={20}
          image="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-09_qskkln.jpg"
          onCropChange={setCropData}
        >
          <CropperDescription />
          <CropperImage />
          <CropperCropArea />
        </Cropper>

        {cropData && (
          <pre className="overflow-auto rounded-md border bg-muted px-4 py-3 font-mono text-foreground/80 text-xs">
            <code>{JSON.stringify(cropData, null, 2)}</code>
          </pre>
        )}
      </div>

      <p
        aria-live="polite"
        className="mt-2 text-muted-foreground text-xs"
        role="region"
      >
        Cropper with crop data output ∙{" "}
        <a
          className="underline hover:text-foreground"
          href="https://github.com/origin-space/image-cropper"
          rel="noopener noreferrer"
          target="_blank"
        >
          API
        </a>
      </p>
    </div>
  );
}
