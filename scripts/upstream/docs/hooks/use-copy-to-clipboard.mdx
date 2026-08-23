---
title: useCopyToClipboard
description: Copy text to clipboard with a temporary "copied" state.
---

A React hook that wraps the Clipboard API with a built-in timeout to reset the copied state. Useful for copy buttons that show brief confirmation feedback.

## Installation

<CodeTabs>

<TabsList>
  <TabsTab value="cli">CLI</TabsTab>
  <TabsTab value="manual">Manual</TabsTab>
</TabsList>
<TabsPanel value="cli">

```bash
npx shadcn@latest add @coss/use-copy-to-clipboard
```

</TabsPanel>

<TabsPanel value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="use-copy-to-clipboard" title="hooks/use-copy-to-clipboard.ts" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsPanel>

</CodeTabs>

## Usage

### Basic

```tsx
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

function CopyButton({ text }: { text: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <button onClick={() => copyToClipboard(text)}>
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
}
```

### Custom timeout

The `isCopied` state resets after 2 seconds by default. You can change this:

```tsx
const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 3000 });
```

Set `timeout` to `0` to keep `isCopied` as `true` indefinitely (until the component unmounts).

### Callback on copy

Run a side effect when a copy succeeds:

```tsx
const { copyToClipboard, isCopied } = useCopyToClipboard({
  onCopy: () => console.log("Copied to clipboard"),
});
```

### With icon swap

A common pattern — swap the icon briefly to confirm the copy:

```tsx
import { CheckIcon, CopyIcon } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/components/ui/button";

function CopyButton({ value }: { value: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Button
      aria-label="Copy to clipboard"
      onClick={() => copyToClipboard(value)}
      size="icon"
      variant="outline"
    >
      {isCopied ? (
        <CheckIcon aria-hidden="true" />
      ) : (
        <CopyIcon aria-hidden="true" />
      )}
    </Button>
  );
}
```

## API

```tsx
function useCopyToClipboard(options?: {
  timeout?: number;
  onCopy?: () => void;
}): {
  copyToClipboard: (value: string) => void;
  isCopied: boolean;
};
```

### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `timeout` | `number` | `2000` | Milliseconds before `isCopied` resets to `false`. Set to `0` to keep it `true`. |
| `onCopy` | `() => void` | — | Callback fired after a successful copy. |

### Return value

| Property | Type | Description |
|----------|------|-------------|
| `copyToClipboard` | `(value: string) => void` | Call with the text to copy. No-op if `value` is empty or clipboard API is unavailable. |
| `isCopied` | `boolean` | `true` for `timeout` ms after a successful copy, then resets. |
