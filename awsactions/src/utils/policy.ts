import { Policy, ServiceStatement, Statement } from "@/model/models";

export enum EFFECTS {
  ALLOW = "Allow",
  DENY = "Deny",
}

const transformActions = (action: string[], service: string) => {
  return action.map((a) => `${service}:${a}`);
};

export const policyActionsToPolicy = (
  policyActions: ServiceStatement[]
): Policy => {
  const statements = policyActions.map((pa) => {
    return new Statement(
      EFFECTS.ALLOW,
      ["*"],
      transformActions(pa.action, pa.service)
    );
  });
  return { Version: "2012-10-17", Statement: statements };
};
