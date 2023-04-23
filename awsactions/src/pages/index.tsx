import services from "./services.json";
import styles from "../styles/Home.module.scss";
import gridStyles from "../styles/common/Grid.module.scss";
import { Box, Grid } from "@mui/material";
import { ServiceStatement, Service, PolicyStatement } from "@/model/models";
import { useState } from "react";
import JsonResult from "@/components/JsonResult";
import PolicyCreateSection from "./PolicyCreateSection";
import GridFullRowItem from "@/components/grid/GridFullRowItem";

const AWSPolicyCreator = ({
  services,
  nameServices,
}: {
  services: Record<string, Service>;
  nameServices: {
    prefix: string;
    name: string;
  }[];
}) => {
  const [policyStatements, setPolicyStatements] = useState<PolicyStatement[]>([
    {
      id: 1,
      services: [],
    },
  ]);

  const addPolicyStatements = () => {
    let last = { id: 0 };
    if (policyStatements.length >= 1) {
      last = policyStatements[policyStatements.length - 1];
    }
    const modifiedPS = [...policyStatements, { id: last.id + 1, services: [] }];
    setPolicyStatements(modifiedPS);
  };

  const deletePolicyStatements = (id: number) => {
    const auxArr = [...policyStatements];
    const index = auxArr.findIndex((element) => element.id === id);
    if (index !== -1) {
      auxArr.splice(index, 1);
    }
    setPolicyStatements(auxArr);
  };

  const modifyServiceStatement = (
    id: number,
    servicesAction: ServiceStatement[]
  ) => {
    const policyActionIndex = policyStatements.findIndex((p) => p.id === id);
    if (policyActionIndex !== -1) {
      const policyStatement = policyStatements[policyActionIndex];
      policyStatement.services = servicesAction;
      const modifiedPS = [...policyStatements];
      modifiedPS[policyActionIndex] = policyStatement;
      setPolicyStatements(modifiedPS);
    }
  };

  return (
    <>
      <Grid container spacing={2} className={styles.mainGrid}>
        <Grid item xs={12} className={gridStyles.gridItem}>
          <h1> AWS Policy Creator</h1>
        </Grid>
        <PolicyCreateSection
          policyStatements={policyStatements}
          modifyServiceStatement={modifyServiceStatement}
          deletePolicyStatements={deletePolicyStatements}
          addPolicyStatements={addPolicyStatements}
          nameServices={nameServices}
          services={services}
        />
        <GridFullRowItem>
          <Box className={styles.boxContent}>
            <JsonResult policyCreate={policyStatements} />
          </Box>
        </GridFullRowItem>
      </Grid>
    </>
  );
};

export async function getStaticProps() {
  const nameServices = Object.values(services).map((ac) => ({
    prefix: ac.prefix,
    name: ac.name,
  }));
  return {
    props: {
      services,
      nameServices,
    },
  };
}

export default AWSPolicyCreator;
