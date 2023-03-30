export interface WriteIssueOptions {
  title: string;
  body: (() => string) | string;
  labels?: string[];
  milestone?: number;
}

export interface UpdateIssueOptions {
  title: string;
  body: (() => string) | string;
  labels?: string[];
  milestone?: number;
  issue_number?: string;
}
