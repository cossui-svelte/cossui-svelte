import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/registry/default/ui/cropper";

export default function Component() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Cropper
        className="aspect-square size-80"
        cropPadding={0}
        image="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-05_evczb3.jpg"
      >
        <CropperDescription />
        <CropperImage />
        <CropperCropArea className="border-4 border-blue-500" />
      </Cropper>

      <p
        aria-live="polite"
        className="mt-2 text-muted-foreground text-xs"
        role="region"
      >
        Cropper with full size crop area ∙{" "}
        <a
          className="underline hover:text-foreground"
          href="https://github.com/origin-space/image-cropper"
          rel="noreferrer"
          target="_blank"
        >
          API
        </a>
      </p>
    </div>
  );
}
