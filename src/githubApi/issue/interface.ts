export interface WriteIssueOptions {
  title: string;
  body: (() => string) | string;
  labels?: string[];
  milestone?: number;
}

export interface UpdateIssueOptions extends WriteIssueOptions {
  issue_number?: string | number;
}
