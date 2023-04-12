import React from "react";

type ActionProps = {
  readActions: string[];
  writeActions: string[];
  listActions: never[];
  prefix: string;
  arn_format: string;
  arn_regex: string;
  name: string;
};
const SelectedAction = ({
  readActions,
  writeActions,
  listActions,
  prefix,
  arn_format,
  arn_regex,
  name,
}: ActionProps) => {
  return <div>SelectedAction</div>;
};

export default SelectedAction;
