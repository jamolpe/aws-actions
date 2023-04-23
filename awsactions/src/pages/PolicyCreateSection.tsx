import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { PolicyStatement, Service, ServiceStatement } from "@/model/models";
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
  policyStatements: PolicyStatement[];
  modifyServiceStatement: (
    id: number,
    servicesAction: ServiceStatement[]
  ) => void;
  deletePolicyStatements: (id: number) => void;
  addPolicyStatements: () => void;
};

const PolicyCreateSection = ({
  services,
  nameServices,
  policyStatements,
  modifyServiceStatement,
  deletePolicyStatements,
  addPolicyStatements,
}: PolicyCreateSectionProps) => {
  return (
    <>
      {policyStatements.map((PA) => {
        return (
          <GridFullRowItem key={PA.id}>
            <ServiceAccordion
              policyStatements={PA.services}
              modifyServiceStatement={modifyServiceStatement}
              deletePolicyStatements={deletePolicyStatements}
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
          onClick={() => addPolicyStatements()}
        >
          Add new statement
        </Button>
      </Grid>
    </>
  );
};

export default PolicyCreateSection;
