export type WorkspacePlatformItem = {
  label: string;
  value: string;
};

export const WORKSPACE_PLATFORM_ITEMS: WorkspacePlatformItem[] = [
  { label: 'Google Workspace', value: 'google_workspace' }
];

export function findWorkspacePlatformItem(value: string): WorkspacePlatformItem | null {
  return WORKSPACE_PLATFORM_ITEMS.find((i) => i.value === value) ?? null;
}
