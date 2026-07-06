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
        className="h-80"
        image="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-08_wneftq.jpg"
        maxZoom={10}
        minZoom={2}
      >
        <CropperDescription />
        <CropperImage />
        <CropperCropArea />
      </Cropper>

      <p
        aria-live="polite"
        className="mt-2 text-muted-foreground text-xs"
        role="region"
      >
        Cropper with custom zoom limits ∙{" "}
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
