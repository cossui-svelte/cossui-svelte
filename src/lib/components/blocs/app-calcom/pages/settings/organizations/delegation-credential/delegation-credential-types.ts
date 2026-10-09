export type DelegationCredentialItem = {
  /** Internal row id (routing, keys). */
  id: string;
  /** Displayed subject / client identifier (numeric string). */
  subjectId: string;
  /** OAuth scope URL shown under the subject. */
  scopeUrl: string;
  /** Workspace platform label (warning badge). */
  platformLabel: string;
  platformValue: string;
  /** Domain label (outline badge), e.g. coss.com */
  domain: string;
  /** Stored JSON from the form (prototype). */
  serviceAccountKeyJson?: string;
};

export const DEFAULT_CALENDAR_SCOPE_URL = 'https://www.googleapis.com/auth/calendar';

export function generateDelegationSubjectId(): string {
  let s = '';
  for (let i = 0; i < 21; i++) {
    s += Math.floor(Math.random() * 10).toString();
  }
  return s;
}

export type EditDelegationCredentialSavePayload = {
  domain: string;
  platformLabel: string;
  platformValue: string;
};
