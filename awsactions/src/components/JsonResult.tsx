import { Policy, ServiceAction, Statement } from "@/model/models";
import styles from "../styles/Home.module.scss";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { policyActionsToPolicy } from "@/utils/policy";

type JsonResultType = {
  serviceActions: ServiceAction[];
};

const JsonResult = ({ serviceActions: policyActions }: JsonResultType) => {
  const [policy, setPolicy] = useState<Policy | null>(null);
  useEffect(() => {
    setPolicy(policyActionsToPolicy(policyActions));
  }, [policyActions]);
  const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });
  return (
    <div className={styles.jsonResult}>
      <h2>JSON</h2>
      <pre>
        {policy && <DynamicReactJson src={policy} displayDataTypes={false} />}
      </pre>
    </div>
  );
};

export default JsonResult;
