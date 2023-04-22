import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { PolicyAction, Service, ServiceAction } from "@/model/models";
import ServiceAccordion from "./ServiceAccordion";
import styles from "../styles/PolicyCreateSection.module.scss";
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
  const [numPolicyActions, setNumPolicyActions] = useState<PolicyAction[]>([
    {
      id: 1,
      services: [],
    },
  ]);

  const addAction = () => {
    let last = { id: 0 };
    if (numPolicyActions.length >= 1) {
      last = numPolicyActions[numPolicyActions.length - 1];
    }
    const modifiedPA = [...numPolicyActions, { id: last.id + 1, services: [] }];
    setNumPolicyActions(modifiedPA);
  };

  const deleteAction = (id: number) => {
    const auxArr = [...numPolicyActions];
    const index = auxArr.findIndex((element) => element.id === id);
    if (index !== -1) {
      auxArr.splice(index, 1);
    }
    setNumPolicyActions(auxArr);
  };

  const modifyServiceToPolicy = (
    id: number,
    servicesAction: ServiceAction[]
  ) => {
    const policyActionIndex = numPolicyActions.findIndex((p) => p.id === id);
    if (policyActionIndex !== -1) {
      const policyAction = numPolicyActions[policyActionIndex];
      policyAction.services = servicesAction;
      const modifiedPA = [...numPolicyActions];
      modifiedPA[policyActionIndex] = policyAction;
      setNumPolicyActions(modifiedPA);
    }
  };

  return (
    <>
      {numPolicyActions.map((PA) => {
        return (
          <GridFullRowItem key={PA.id}>
            <ServiceAccordion
              policyServices={PA.services}
              modifyServiceToPolicy={modifyServiceToPolicy}
              deleteAction={deleteAction}
              id={PA.id}
              accordionId={PA.id}
              defaultServices={services}
              nameServices={nameServices}
            />
          </GridFullRowItem>
        );
      })}
      <Grid
        item
        xs={12}
        className={`${gridStyles.gridItem} ${styles.gridButtons}`}
      >
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
