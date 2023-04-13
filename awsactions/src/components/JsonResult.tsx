import { PolicyAction } from "@/model/models";
import styles from "../styles/Home.module.scss";

import React from "react";
import dynamic from "next/dynamic";

type JsonResultType = {
  policyActions: PolicyAction[];
};

const JsonResult = ({ policyActions }: JsonResultType) => {
  const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

  return (
    <div className={styles.jsonResult}>
      <h2>JSON</h2>
      <pre>
        {policyActions.length > 0 && (
          <DynamicReactJson src={policyActions} displayDataTypes={false} />
        )}
      </pre>
    </div>
  );
};

export default JsonResult;
