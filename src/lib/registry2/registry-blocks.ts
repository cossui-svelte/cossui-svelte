export interface ComponentMeta {
  id: string;
  name: string;
  description: string;
  file: string; // relative to src/lib/components/
  tags: string[]; // optional tags for categorization
}

export const components: ComponentMeta[] = [
  {
    id: 'badge',
    name: 'Badge Counter',
    description: 'A button with a reactive click counter badge.',
    file: 'BadgeDemo.svelte',
    tags: ['reactive', 'counter', 'badge'],
  },
  {
    id: 'toggle',
    name: 'Toggle Switch',
    description: 'An animated on/off toggle using a checkbox.',
    file: 'ToggleDemo.svelte',
    tags: ['animated', 'toggle', 'checkbox'],
  },
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'An expandable FAQ-style accordion.',
    file: 'AccordionDemo.svelte',
    tags: ['expandable', 'faq', 'accordion'],
  },
];
