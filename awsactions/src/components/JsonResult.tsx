import { PolicyAction } from "@/model/models";
import styles from "../styles/Home.module.scss";

import React from "react";

type JsonResultType = {
  policyActions: PolicyAction[];
};

const JsonResult = ({ policyActions }: JsonResultType) => {
  return (
    <div className={styles.jsonResult}>
      <h2>JSON</h2>
      <pre>{policyActions.length > 0 && JSON.stringify(policyActions)}</pre>
    </div>
  );
};

export default JsonResult;
