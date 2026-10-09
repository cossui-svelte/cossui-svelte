<script lang="ts">
  import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Group } from '#lib/components/ui/group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import {
    Sheet,
    SheetClose,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetPanel,
    SheetPopup,
    SheetTitle,
    SheetTrigger
  } from '#lib/components/ui/sheet/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Admin billing">
    <AppHeaderDescription>
      Manage billing emails and Stripe portal access for licenses.
    </AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Self-hosted deployment lookup</CardFrameTitle>
    </CardFrameHeader>
    <Card>
      <CardPanel>
        <Field>
          <FieldLabel>Billing email</FieldLabel>
          <Group aria-label="User impersonation" class="w-full gap-2">
            <Input placeholder="customer@example.com" type="email" />
            <div>
              <Sheet>
                <SheetTrigger class={buttonVariants()}>Search</SheetTrigger>
                <SheetPopup variant="inset">
                  <SheetHeader>
                    <SheetTitle>Deployment details</SheetTitle>
                    <SheetDescription>a@gmail.com</SheetDescription>
                  </SheetHeader>
                  <SheetPanel class="flex flex-col gap-6">
                    <div class="flex flex-col gap-2">
                      <h3 class="font-semibold text-sm">Billing details</h3>
                      <dl class="flex flex-col gap-2 rounded-xl border p-4 text-xs">
                        <div class="flex justify-between gap-4">
                          <dt class="text-muted-foreground">Billing email</dt>
                          <dd class="font-medium">a@gmail.com</dd>
                        </div>
                        <div class="flex justify-between gap-4">
                          <dt class="text-muted-foreground">Customer ID</dt>
                          <dd class="font-medium">cus_mock123456789</dd>
                        </div>
                        <div class="flex justify-between gap-4">
                          <dt class="text-muted-foreground">Created</dt>
                          <dd class="font-medium">1/15/2024</dd>
                        </div>
                        <div class="flex justify-between gap-4">
                          <dt class="text-muted-foreground">Last updated</dt>
                          <dd class="font-medium">3/1/2024</dd>
                        </div>
                      </dl>
                    </div>

                    <div class="flex flex-col gap-2">
                      <h3 class="font-semibold text-sm">License keys (2)</h3>
                      <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-4 rounded-xl border p-4 text-xs">
                          <dl class="flex flex-col gap-2">
                            <div class="flex justify-between gap-4">
                              <dd class="font-medium font-mono">cal_live...xxxxxxxx</dd>
                              <dd class="flex items-center gap-2">
                                <Badge variant="success">active</Badge>
                                <Badge variant="info">SELF_HOSTED</Badge>
                              </dd>
                            </div>
                            <div class="flex justify-between gap-4">
                              <dt class="text-muted-foreground">Subscription ID</dt>
                              <dd class="font-medium">sub_mock123456789</dd>
                            </div>
                            <div class="flex justify-between gap-4">
                              <dt class="text-muted-foreground">Billing type</dt>
                              <dd class="font-medium">PER_USER</dd>
                            </div>
                            <div class="flex justify-between gap-4">
                              <dt class="text-muted-foreground">Entity count</dt>
                              <dd class="font-medium">10</dd>
                            </div>
                            <div class="flex justify-between gap-4">
                              <dt class="text-muted-foreground">Entity price</dt>
                              <dd class="font-medium">$5.00</dd>
                            </div>
                            <div class="flex justify-between gap-4">
                              <dt class="text-muted-foreground">Overages</dt>
                              <dd class="font-medium">0</dd>
                            </div>
                          </dl>
                          <div>
                            <h4 class="mb-2 font-semibold text-sm">Recent usage (last 30 days)</h4>
                            <dl class="flex flex-col gap-1">
                              <div class="flex justify-between">
                                <dt class="text-muted-foreground">2/1/2024</dt>
                                <dd>42</dd>
                              </div>
                              <div class="flex justify-between">
                                <dt class="text-muted-foreground">2/15/2024</dt>
                                <dd>38</dd>
                              </div>
                              <div class="flex justify-between">
                                <dt class="text-muted-foreground">3/1/2024</dt>
                                <dd>55</dd>
                              </div>
                            </dl>
                          </div>
                        </div>

                        <div class="flex flex-col gap-4 rounded-xl border p-4 text-xs">
                          <dl class="flex flex-col gap-2">
                            <div class="flex justify-between gap-4">
                              <dd class="font-medium font-mono">cal_live...yyyyyyyy</dd>
                              <dd class="flex items-center gap-2">
                                <Badge variant="secondary">Inactive</Badge>
                                <Badge variant="info">SELF_HOSTED</Badge>
                              </dd>
                            </div>
                            <div class="flex justify-between gap-4">
                              <dt class="text-muted-foreground">Subscription ID</dt>
                              <dd class="font-medium">Not set</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </SheetPanel>
                  <SheetFooter>
                    <SheetClose class={buttonVariants({ variant: 'ghost' })}>Close</SheetClose>
                    <Button variant="outline">Edit billing</Button>
                    <Button variant="outline">Resend email</Button>
                  </SheetFooter>
                </SheetPopup>
              </Sheet>
            </div>
          </Group>
          <FieldDescription>
            Search for a self-hosted deployment by billing email to view and manage its details.
          </FieldDescription>
        </Field>
      </CardPanel>
    </Card>
  </CardFrame>
  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Resend purchase confirmation</CardFrameTitle>
    </CardFrameHeader>
    <Card>
      <CardPanel>
        <Field>
          <FieldLabel>Billing email</FieldLabel>
          <Group aria-label="User impersonation" class="w-full gap-2">
            <Input placeholder="customer@example.com" type="email" />
            <div>
              <Button>Resend email</Button>
            </div>
          </Group>
          <FieldDescription>
            Send the purchase confirmation email to a billing address.
          </FieldDescription>
        </Field>
      </CardPanel>
    </Card>
  </CardFrame>
  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Billing portal</CardFrameTitle>
    </CardFrameHeader>
    <Card>
      <CardPanel>
        <div class="flex items-center justify-between gap-4">
          <div>
            <CardFrameDescription
              >Open the Stripe billing portal for this license.</CardFrameDescription
            >
          </div>
          <Button>
            Billing portal
            <ExternalLinkIcon aria-hidden="true" />
          </Button>
        </div>
      </CardPanel>
    </Card>
  </CardFrame>
</div>
