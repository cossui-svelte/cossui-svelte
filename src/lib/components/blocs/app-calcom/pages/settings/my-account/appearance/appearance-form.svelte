<script lang="ts" module>
  export const themeItems = [
    {
      imageSrc: 'https://app.cal.com/theme-system.svg',
      label: 'System default',
      value: 'system'
    },
    {
      imageSrc: 'https://app.cal.com/theme-light.svg',
      label: 'Light',
      value: 'light'
    },
    {
      imageSrc: 'https://app.cal.com/theme-dark.svg',
      label: 'Dark',
      value: 'dark'
    }
  ];
</script>

<script lang="ts">
  import { Fieldset } from '#lib/components/ui/fieldset/index.js';
  import { ImageRadioOption } from '../../../../components/particles/index.js';

  let value = $state('light');
</script>

<Fieldset>
  <ImageRadioOption bind:value items={themeItems} />
</Fieldset>
