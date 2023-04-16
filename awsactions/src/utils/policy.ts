import { Policy, ServiceAction, Statement } from "@/model/models";

export enum EFFECTS {
  ALLOW = "Allow",
  DENY = "Deny",
}

const transformActions = (action: string[], service: string) => {
  return action.map((a) => `${service}:${a}`);
};

export const policyActionsToPolicy = (
  policyActions: ServiceAction[]
): Policy => {
  const statements = policyActions.map((pa) => {
    return new Statement(
      EFFECTS.ALLOW,
      ["*"],
      transformActions(pa.Action, pa.Service)
    );
  });
  return { Version: "2012-10-17", Statement: statements };
};
