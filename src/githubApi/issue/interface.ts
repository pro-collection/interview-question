export interface WriteIssueOptions {
  title: string;
  body: (() => string) | string;
  labels?: string[];
  milestone?: number;
}
