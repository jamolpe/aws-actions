import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { Service, ServiceAction } from "@/model/models";
import ServiceAccordion from "./ServiceAccordion";
import styles from "../styles/Home.module.scss";
import commonStyle from "../styles/styles.module.scss";
import GridFullRowItem from "@/components/grid/GridFullRowItem";
import gridStyles from "../styles/common/Grid.module.scss";

type PolicyCreateSectionProps = {
  services: Record<string, Service>;
  nameServices: {
    prefix: string;
    name: string;
  }[];
};

const PolicyCreateSection = ({
  services,
  nameServices,
}: PolicyCreateSectionProps) => {
  const [numPolicyActions, setNumPolicyActions] = useState<number>(1);
  const [policyActions, setPolicyActions] = useState<ServiceAction[]>([]);
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const addAction = () => {
    const newNum = numPolicyActions + 1;
    setNumPolicyActions(newNum);
  };

  return (
    <>
      {Array.from({ length: numPolicyActions }, (_, i) => i).map((i) => {
        return (
          <GridFullRowItem key={i}>
            <ServiceAccordion
              key={i}
              accordionId={i}
              services={services}
              nameServices={nameServices}
            />
          </GridFullRowItem>
        );
      })}
      <Grid xs={12} className={`${gridStyles.gridItem} ${styles.gridButtons}`}>
        <Button
          sx={{ background: commonStyle.greenBlue }}
          variant="contained"
          onClick={() => addAction()}
        >
          Add new action
        </Button>
      </Grid>
    </>
  );
};

export default PolicyCreateSection;
