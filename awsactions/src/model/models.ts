export interface Service {
  readActions: string[];
  writeActions: string[];
  listActions: string[];
  prefix: string;
  arn_format: string;
  arn_regex: string;
  name: string;
}
