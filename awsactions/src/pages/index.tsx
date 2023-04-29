import services from "./services.json";
import styles from "../styles/Home.module.scss";
import gridStyles from "../styles/common/Grid.module.scss";
import { Box, Grid } from "@mui/material";
import { ServiceStatement, Service, PolicyStatement } from "@/model/models";
import { useState } from "react";
import JsonResult from "@/components/JsonResult";
import PolicyCreateSection from "./PolicyCreateSection";
import GridFullRowItem from "@/components/grid/GridFullRowItem";
import { uuid } from "uuidv4";

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
  const [policyStatements, setPolicyStatements] = useState<PolicyStatement[]>(
    []
  );

  const addPolicyStatements = () => {
    const modifiedPS = [...policyStatements, { services: [], uuid: uuid() }];
    setPolicyStatements(modifiedPS);
  };

  const deletePolicyStatements = (uuid: string) => {
    const auxArr = [...policyStatements];
    const index = auxArr.findIndex((element) => element.uuid === uuid);
    if (index !== -1) {
      auxArr.splice(index, 1);
    }
    setPolicyStatements(auxArr);
  };

  const modifyServiceStatement = (
    uuid: string,
    servicesAction: ServiceStatement[]
  ) => {
    const policyActionIndex = policyStatements.findIndex(
      (p) => p.uuid === uuid
    );
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
      <Grid container spacing={2} className={gridStyles.mainGrid}>
        <GridFullRowItem>
          <h1> AWS Policy Creator</h1>
        </GridFullRowItem>
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
