---
title: Toast
description: A temporary notification that appears on screen to inform users.

links:
  doc: https://base-ui.com/react/components/toast#api-reference
---

<ComponentPreview name="p-toast-1" />

## Installation

<CodeTabs>

<TabsList>
  <TabsTab value="cli">CLI</TabsTab>
  <TabsTab value="manual">Manual</TabsTab>
</TabsList>
<TabsPanel value="cli">

```bash
npx shadcn@latest add @coss/toast
```

<Step>Add the `ToastProvider` and `AnchoredToastProvider` to your app.</Step>

<span data-lib="base-ui">
```tsx title="app/layout.tsx"
// [!code word:import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast"]
// [!code word:<ToastProvider>]
// [!code word:<AnchoredToastProvider>]
// [!code word:</AnchoredToastProvider>]
// [!code word:</ToastProvider>]
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ToastProvider>
          <AnchoredToastProvider>
            <main>{children}</main>
          </AnchoredToastProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
```
</span>

</TabsPanel>

<TabsPanel value="manual">

<Steps>

<Step>Install the following dependencies:</Step>

```bash
npm install @base-ui/react
```

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="toast" title="components/ui/toast.tsx" />

<Step>Update the import paths to match your project setup.</Step>

<Step>Add the `ToastProvider` and `AnchoredToastProvider` to your app.</Step>

<span data-lib="base-ui">
```tsx title="app/layout.tsx"
// [!code word:import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast"]
// [!code word:<ToastProvider>]
// [!code word:<AnchoredToastProvider>]
// [!code word:</AnchoredToastProvider>]
// [!code word:</ToastProvider>]
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ToastProvider>
          <AnchoredToastProvider>
            <main>{children}</main>
          </AnchoredToastProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
```
</span>

</Steps>

</TabsPanel>

</CodeTabs>

## Usage

### Stacked Toasts

```tsx
import { toastManager } from "@/components/ui/toast"
```

```tsx
toastManager.add({
  title: "Event has been created",
  description: "Monday, January 3rd at 6:00pm",
})
```

By default, toasts appear in the **bottom-right** corner. You can change this by setting the `position` prop on the `ToastProvider`.

Allowed values: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`. For example:

```tsx
<ToastProvider position="top-center">{children}</ToastProvider>
```

### Deduplicated toasts (upsert)

Pass a stable `id` when calling `toastManager.add`. If a toast with that `id` already exists, Base UI updates it in place, refreshes the auto-dismiss timer, and increments `updateKey`. The styled toast replays a short re-notify animation on each update.

```tsx
toastManager.add({
  id: "save-status",
  title: "Saved",
  description: "Your draft was updated.",
})
```

<ComponentPreview name="p-toast-10" />

### Anchored Toasts

For toasts positioned relative to a specific element, use `anchoredToastManager`. The `AnchoredToastProvider` is typically added to your app layout (alongside `ToastProvider`), so you can use `anchoredToastManager` directly in your components:

```tsx
anchoredToastManager.add({
  title: "Copied!",
  positionerProps: {
    anchor: buttonRef.current,
  },
})
```

You can also style anchored toasts like tooltips by passing `data: { tooltipStyle: true }`. When using tooltip style, only the `title` is displayed (description and other content are ignored):

```tsx
anchoredToastManager.add({
  title: "Copied!",
  positionerProps: {
    anchor: buttonRef.current,
  },
  data: {
    tooltipStyle: true,
  },
})
```

<ComponentPreview name="p-toast-12" />

## API Reference

### ToastProvider

Provider component for stacked toasts. Wraps `Toast.Provider` from Base UI.

| Prop          | Type                                                                                     | Default          | Description                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| `position`    | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-right"` | Position of the toast viewport                                                                         |
| `portalProps` | `Toast.Portal.Props`                                                                    | -                | Props forwarded to the internal portal (`container`, etc.); see Base UI Toast portal API                |

### AnchoredToastProvider

Provider component for toasts anchored to specific elements. Use with `anchoredToastManager`.

| Prop          | Type                 | Default | Description                                                                             |
| ------------- | -------------------- | ------- | --------------------------------------------------------------------------------------- |
| `portalProps` | `Toast.Portal.Props` | -       | Props forwarded to the internal portal (`container`, etc.); see Base UI Toast portal API |

### toastManager

Manager object for creating stacked toasts. Use `toastManager.add()` to show a toast. Pass the same `id` on a later `add` to update that toast in place (dedupe) instead of stacking a duplicate.

### anchoredToastManager

Manager object for creating anchored toasts. Use `anchoredToastManager.add()` with `positionerProps.anchor` to show a toast anchored to an element. Repeated `add` calls with the same `id` update in place, same as stacked toasts.

### ToastViewport

Viewport container for toasts. Styled wrapper for `Toast.Viewport` from Base UI.

### Toast

Individual toast container. Styled wrapper for `Toast.Root` from Base UI.

### ToastTitle

Title text for the toast. Styled wrapper for `Toast.Title` from Base UI.

### ToastDescription

Description text for the toast. Styled wrapper for `Toast.Description` from Base UI.

### ToastAction

Action button for the toast. Styled wrapper for `Toast.Action` from Base UI.

### ToastClose

Close button for the toast. Styled wrapper for `Toast.Close` from Base UI.

## Examples

### With Status

<ComponentPreview name="p-toast-2" />

### Loading

<ComponentPreview name="p-toast-3" />

### With Action

<ComponentPreview name="p-toast-4" />

### Promise

<ComponentPreview name="p-toast-5" />

### With Varying Heights

<ComponentPreview name="p-toast-6" />

### Copy Button with Anchored Toast

<ComponentPreview name="p-toast-7" />

### Submit Button with Error Toast

<ComponentPreview name="p-toast-8" />
