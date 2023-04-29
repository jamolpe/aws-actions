import { EFFECTS } from "@/utils/policy";
import { uuid } from "uuidv4";

export interface Service {
  readActions: string[];
  writeActions: string[];
  listActions: string[];
  prefix: string;
  arn_format: string;
  arn_regex: string;
  name: string;
}

export interface ServiceStatement {
  action: string[];
  service: string;
  arn: string;
}

export interface PolicyStatement {
  id: number;
  services: ServiceStatement[];
}

export interface Policy {
  Version: string;
  Statement: Statement[];
}

export class Statement {
  Sid: string;
  Effect: EFFECTS;
  Action: string[];
  Resource: string[];
  constructor(effect: EFFECTS, resource: string[], action: string[]) {
    this.Sid = uuid();
    this.Effect = effect;
    this.Action = action;
    this.Resource = resource;
  }
}
