import { Policy, ServiceAction } from "@/model/models";
import styles from "../styles/Home.module.scss";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { policyActionsToPolicy } from "@/utils/policy";

type JsonResultType = {
  serviceActions: ServiceAction[];
};

const JsonResult = ({ serviceActions }: JsonResultType) => {
  const [policy, setPolicy] = useState<Policy | null>(null);
  useEffect(() => {
    setPolicy(policyActionsToPolicy(serviceActions));
  }, [serviceActions]);
  const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });
  return (
    <div className={styles.jsonResult}>
      <h2>Policy</h2>
      <pre className={styles.jsonContent}>
        {policy && <DynamicReactJson src={policy} displayDataTypes={false} />}
      </pre>
    </div>
  );
};

export default JsonResult;
