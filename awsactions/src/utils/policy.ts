import { Policy, PolicyStatement, Statement } from "@/model/models";

const ARN_REGEX = /\${([a-zA-Z0-9_-]+)}/g;
const ARN_PLACEHOLDER = /\$\{([\w.-]+)\}/g;

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
          ps.uuid,
          EFFECTS.ALLOW,
          [ps.services[i].arn],
          transformActions(ps.services[i].action, ps.services[i].service)
        )
      );
    }
    return result;
  }, []);
  return { Version: "2012-10-17", Statement: statements };
};

export const getVariablesFromArnFormat = (arn: string) => {
  return [...arn.matchAll(ARN_REGEX)].map((match) => match[1]);
};

export const substitute = (str: string, values: Record<string, string>) => {
  return str.replace(ARN_PLACEHOLDER, function (match, key) {
    return values.hasOwnProperty(key) ? values[key] : match;
  });
};
