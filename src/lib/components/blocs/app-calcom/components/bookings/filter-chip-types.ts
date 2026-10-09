export type TextFilterOperator =
  | 'contains'
  | 'does-not-contain'
  | 'ends-with'
  | 'is'
  | 'is-empty'
  | 'is-not'
  | 'not-empty'
  | 'starts-with';

export type FilterOption = {
  avatar?: string | null;
  id: string;
  label: string;
};

export type FilterField =
  | {
      id: string;
      kind: 'dateRange';
      label: string;
    }
  | {
      id: string;
      kind: 'options';
      label: string;
      options: FilterOption[];
      showAvatar?: boolean;
    }
  | {
      id: string;
      kind: 'text';
      label: string;
    };

export type ActiveFilter = {
  f: string;
  op?: TextFilterOperator;
  v?: string[];
};

export function isTextFilterComplete(filter: ActiveFilter): boolean {
  const op = filter.op ?? 'is';
  if (op === 'is-empty' || op === 'not-empty') {
    return true;
  }
  return Boolean(filter.v?.[0]?.trim());
}

export function isActiveFilterComplete(field: FilterField, filter: ActiveFilter): boolean {
  switch (field.kind) {
    case 'dateRange':
      return Boolean(filter.v && filter.v.length >= 2);
    case 'options':
      return Boolean(filter.v && filter.v.length > 0);
    case 'text':
      return isTextFilterComplete(filter);
    default:
      return false;
  }
}
