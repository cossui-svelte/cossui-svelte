import Tabs from './tabs.svelte';
import TabsList from './tabs-list.svelte';
import TabsPanel from './tabs-panel.svelte';
import TabsTab from './tabs-tab.svelte';

export type TabsVariant = 'default' | 'underline';

export { Tabs, TabsList, TabsPanel, TabsPanel as TabsContent, TabsTab, TabsTab as TabsTrigger };

