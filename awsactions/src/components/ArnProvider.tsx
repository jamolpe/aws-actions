import { TextField } from "@mui/material";
import styles from "../styles/components/ArnProvider.module.scss";
import React, { useEffect, useState } from "react";
import { getVariablesFromArnFormat, substitute } from "@/utils/policy";

type ArnProviderProps = {
  arn: string;
  handleArn: (event: any) => void;
  arnFormat: string;
};

const ArnType = ({
  arnType,
  onArnTypeChange,
}: {
  arnType: string;
  arnValue: string;
  onArnTypeChange: (arnTypeName: string, arnValue: string) => void;
}) => {
  const [arnValue, setArnValue] = useState(arnType);
  const onChangeArn = (value: string) => {
    setArnValue(value);
    onArnTypeChange(arnType, value);
  };
  return (
    <TextField
      size="small"
      label={arnType}
      value={arnValue}
      className={styles.arn}
      sx={{ width: 300, background: "white" }}
      onChange={(e) => onChangeArn(e.target.value)}
    />
  );
};

const ArnProvider = ({ arn, handleArn, arnFormat }: ArnProviderProps) => {
  const [arnTypes, setArnTypes] = useState<Record<string, string>>({});
  useEffect(() => {
    console.log("entro");
    const arnTypes = getVariablesFromArnFormat(arnFormat);
    setArnTypes(
      arnTypes.reduce((prev: Record<string, string>, current) => {
        prev[current] = current;
        return prev;
      }, {})
    );
  }, [arnFormat, arn]);

  const onArnTypeChange = (arnTypeName: string, arnValue: string) => {
    const newArnTypes = arnTypes;
    newArnTypes[arnTypeName] = arnValue;
    const arnWithType = substitute(arnFormat, newArnTypes);
    if (arnWithType) handleArn(arnWithType);
  };
  return (
    <>
      {Object.keys(arnTypes).map((arnType, i) => {
        return (
          <ArnType
            arnType={arnType}
            key={i}
            arnValue={arnTypes[arnType]}
            onArnTypeChange={onArnTypeChange}
          />
        );
      })}
      <TextField
        size="small"
        label="ARN"
        className={styles.arn}
        value={arn}
        sx={{ width: 300, background: "white" }}
        onChange={(e) => handleArn(e.target.value)}
      />
    </>
  );
};

export default ArnProvider;
