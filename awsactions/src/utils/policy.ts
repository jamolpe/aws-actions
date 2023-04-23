import {
  Policy,
  PolicyStatement,
  ServiceStatement,
  Statement,
} from "@/model/models";

export enum EFFECTS {
  ALLOW = "Allow",
  DENY = "Deny",
}

const transformActions = (action: string[], service: string) => {
  return action.map((a) => `${service}:${a}`);
};

export const policyActionsToPolicy = (
  policyStatements: PolicyStatement[]
): Policy => {
  const statements = policyStatements.reduce((prev: Statement[], ps) => {
    const result = prev;
    for (let i = 0; i <= ps.services.length - 1; i++) {
      result.push(
        new Statement(
          EFFECTS.ALLOW,
          ["*"],
          transformActions(ps.services[i].action, ps.services[i].service)
        )
      );
    }
    return result;
  }, []);
  return { Version: "2012-10-17", Statement: statements };
};
