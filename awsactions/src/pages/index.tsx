import services from "./services.json";
import styles from "../styles/Home.module.scss";
import gridStyles from "../styles/common/Grid.module.scss";

import { Grid } from "@mui/material";
import { ServiceAction, Service } from "@/model/models";
import { useState } from "react";
import JsonResult from "@/components/JsonResult";
import PolicyCreateSection from "./PolicyCreateSection";
import GridFullRowItem from "@/components/grid/GridFullRowItem";

const Actions = ({
  services,
  nameServices,
}: {
  services: Record<string, Service>;
  nameServices: {
    prefix: string;
    name: string;
  }[];
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceActions, setServiceActions] = useState<ServiceAction[]>([]);

  const changeSelected = (serviceName: string | null) => {
    if (!serviceName) return setSelectedService(null);
    const service = nameServices.find((n) => n.name === serviceName);
    if (service) {
      setSelectedService(services[service.prefix]);
    }
  };

  const addServiceAction = (serviceAction: ServiceAction) => {
    const index = serviceActions.findIndex(
      (p) => p.Service === serviceAction.Service
    );
    if (index >= 0) {
      const newPolicies = [...serviceActions];
      newPolicies[index] = serviceAction;
      setServiceActions(newPolicies);
    } else {
      const newPolicies = [...serviceActions, serviceAction];
      setServiceActions(newPolicies);
    }
  };

  const removeServiceAction = (service: string) => {
    const newPolicies = serviceActions.filter((pa) => pa.Service !== service);
    setServiceActions(newPolicies);
  };

  return (
    <>
      <Grid container spacing={2} className={styles.mainGrid}>
        <Grid item xs={12} className={gridStyles.gridItem}>
          <h1> AWS Services</h1>
        </Grid>
        <PolicyCreateSection nameServices={nameServices} services={services} />
        <GridFullRowItem>
          <div>test</div>
          {/* <Box className={styles.boxContent}>
            <JsonResult serviceActions={serviceActions} />
          </Box> */}
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

export default Actions;
