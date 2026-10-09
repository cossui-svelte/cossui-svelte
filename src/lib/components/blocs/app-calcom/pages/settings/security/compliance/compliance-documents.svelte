<script lang="ts">
  import DownloadIcon from '@lucide/svelte/icons/download';
  import FileTextIcon from '@lucide/svelte/icons/file-text';
  import LockIcon from '@lucide/svelte/icons/lock';
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import { EmptyMedia } from '#lib/components/ui/empty/index.js';
  import {
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemDescription,
    ListItemHeader,
    ListItemTitle
  } from '../../../../components/list-item/index.js';

  interface ComplianceDocument {
    id: string;
    name: string;
    description: string;
    url: string;
    restricted: boolean;
  }

  const DOCUMENT_SECTIONS: readonly { title: string; documents: readonly ComplianceDocument[] }[] =
    [
      {
        documents: [
          {
            description: 'View and download the DPA for Cal.com',
            id: 'dpa',
            name: 'Data protection agreement',
            restricted: false,
            url: 'https://go.cal.com/dpa'
          }
        ],
        title: 'Data privacy'
      },
      {
        documents: [
          {
            description: 'SOC 2 Type II audit report',
            id: 'soc2-report',
            name: 'SOC 2 report',
            restricted: true,
            url: '#'
          },
          {
            description: 'ISO/IEC 27001:2022 certificate',
            id: 'iso27001-cert',
            name: 'ISO 27001 certification',
            restricted: true,
            url: '#'
          }
        ],
        title: 'Compliance reports'
      },
      {
        documents: [
          {
            description: 'Latest third-party penetration test results',
            id: 'pentest-report',
            name: 'Penetration test report',
            restricted: true,
            url: '#'
          }
        ],
        title: 'Other documents'
      }
    ];

  const hasRestrictedAccess = false;
</script>

<div class="flex flex-col gap-6">
  {#each DOCUMENT_SECTIONS as section (section.title)}
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>{section.title}</CardFrameTitle>
      </CardFrameHeader>
      <Card>
        <CardPanel class="p-0">
          {#each section.documents as doc (doc.id)}
            {@const hasAccess = !doc.restricted || hasRestrictedAccess}
            <ListItem>
              <EmptyMedia class="m-0 self-start" variant="icon">
                <FileTextIcon />
              </EmptyMedia>
              <div class="flex flex-1 gap-4 max-sm:flex-col">
                <ListItemContent>
                  <ListItemHeader>
                    <div class="flex items-start gap-4">
                      <div>
                        <ListItemTitle>{doc.name}</ListItemTitle>
                        <ListItemDescription>{doc.description}</ListItemDescription>
                      </div>
                    </div>
                  </ListItemHeader>
                </ListItemContent>
                <ListItemActions>
                  <Button disabled={!hasAccess} variant="outline">
                    {#if hasAccess}<DownloadIcon />{:else}<LockIcon />{/if}
                    {hasAccess ? 'Download' : 'Upgrade to access'}
                  </Button>
                </ListItemActions>
              </div>
            </ListItem>
          {/each}
        </CardPanel>
      </Card>
    </CardFrame>
  {/each}
</div>
