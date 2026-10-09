<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import { Field, FieldDescription } from '#lib/components/ui/field/index.js';
  import { Group } from '#lib/components/ui/group/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText
  } from '#lib/components/ui/input-group/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import {
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemDescription,
    ListItemHeader,
    ListItemTitle
  } from '../../../../components/list-item/index.js';

  let { params: _params }: { params?: Record<string, string> } = $props();

  const RECENT_IMPERSONATIONS = [
    {
      impersonatedAt: '2/23/2026 5:21:37 PM',
      user: 'teampro'
    },
    {
      impersonatedAt: '2/23/2026 5:21:22 PM',
      user: 'platformadmin2024!'
    }
  ];
</script>

<AppHeader>
  <AppHeaderContent title="Admin">
    <AppHeaderDescription>Impersonation</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>User impersonation</CardFrameTitle>
    </CardFrameHeader>
    <Card>
      <CardPanel>
        <Field>
          <Group aria-label="User impersonation" class="w-full gap-2">
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>http://localhost:3000/</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                aria-label="User to impersonate"
                class="*:[input]:ps-0!"
                placeholder="username"
                type="text"
              />
            </InputGroup>
            <div>
              <Button>Impersonate</Button>
            </div>
          </Group>
          <FieldDescription>All uses of this feature is audited.</FieldDescription>
        </Field>
      </CardPanel>
    </Card>
  </CardFrame>

  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Recent impersonations</CardFrameTitle>
    </CardFrameHeader>
    <Card>
      <CardPanel class="p-0">
        {#each RECENT_IMPERSONATIONS as entry (entry.user)}
          <ListItem>
            <ListItemContent>
              <ListItemHeader>
                <ListItemTitle>{entry.user}</ListItemTitle>
                <ListItemDescription>Impersonated at {entry.impersonatedAt}</ListItemDescription>
              </ListItemHeader>
            </ListItemContent>
            <ListItemActions>
              <Button variant="outline">Quick impersonate</Button>
            </ListItemActions>
          </ListItem>
        {/each}
      </CardPanel>
    </Card>
  </CardFrame>
</div>
