<script lang="ts" module>
  export interface OAuthClientFormDefaults {
    clientName?: string;
    purpose?: string;
    redirectUri?: string;
    usePkce?: boolean;
    websiteUrl?: string;
  }
</script>

<script lang="ts">
  import KeyIcon from '@lucide/svelte/icons/key';
  import { Avatar, AvatarFallback } from '#lib/components/ui/avatar/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { Textarea } from '#lib/components/ui/textarea/index.js';

  let {
    defaultValues,
    includeClientName = true
  }: { defaultValues?: OAuthClientFormDefaults; includeClientName?: boolean } = $props();
</script>

{#if includeClientName}
  <Field>
    <FieldLabel>Client name</FieldLabel>
    <Input
      name="clientName"
      placeholder="My OAuth App"
      type="text"
      value={defaultValues?.clientName}
    />
  </Field>
{/if}

<Field>
  <FieldLabel>Purpose</FieldLabel>
  <Textarea
    name="purpose"
    placeholder="Explain what this OAuth client is for and how it will be used"
    rows={3}
    value={defaultValues?.purpose}
  />
  <FieldDescription>
    Please explain how and what this OAuth client will be used for. This helps us review and approve
    your request.
  </FieldDescription>
</Field>

<Field>
  <FieldLabel>Redirect URI</FieldLabel>
  <Input
    name="redirectUri"
    placeholder="https://example.com/callback"
    type="url"
    value={defaultValues?.redirectUri}
  />
  <FieldDescription>The URL where users will be redirected after authorization.</FieldDescription>
</Field>

<Field>
  <FieldLabel>Website URL</FieldLabel>
  <Input
    name="websiteUrl"
    placeholder="https://example.com"
    type="url"
    value={defaultValues?.websiteUrl}
  />
  <FieldDescription>
    For development, you can use a localhost URL (e.g. http://localhost:3000).
  </FieldDescription>
</Field>

<Field>
  <FieldLabel>
    <Switch checked={defaultValues?.usePkce ?? false} />
    Use PKCE
  </FieldLabel>
  <FieldDescription>
    Proof Key for Code Exchange adds an extra layer of security for public clients such as mobile or
    single-page apps.
  </FieldDescription>
</Field>

<div class="flex items-center gap-4">
  <Avatar class="size-16">
    <AvatarFallback class="text-xl">
      <KeyIcon class="size-5 text-muted-foreground" />
    </AvatarFallback>
  </Avatar>
  <div class="flex flex-col gap-1">
    <Label class="text-sm">Logo</Label>
    <div class="flex items-center gap-2">
      <Button size="sm" type="button" variant="outline">Upload logo</Button>
      <Button size="sm" type="button" variant="ghost">Remove</Button>
    </div>
  </div>
</div>
