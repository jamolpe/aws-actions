import services from "./services.json";
import styles from "../styles/Home.module.scss";
import ServiceSelector from "@/components/ActionsSelector";
import { Box, Grid } from "@mui/material";
import SelectedService from "@/components/SelectedService";
import { ServiceAction, Service } from "@/model/models";
import { useState } from "react";
import JsonResult from "@/components/JsonResult";

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
        <Grid item xs={12} className={styles.gridItem}>
          <h1> AWS Services</h1>
        </Grid>
        <Grid item xs={12} className={styles.gridItem}>
          <Box className={styles.boxContent}>
            <ServiceSelector
              serviceNames={nameServices.map((a) => a.name)}
              selected={selectedService?.name ?? null}
              changeSelected={changeSelected}
            />
          </Box>
        </Grid>
        {selectedService && (
          <Grid item xs={12} className={styles.gridItem}>
            <Box className={styles.boxContent}>
              <SelectedService
                actions={
                  serviceActions.find(
                    (pa) => pa.Service === selectedService.prefix
                  )?.Action ?? []
                }
                service={selectedService}
                addServiceAction={addServiceAction}
                removeServiceAction={removeServiceAction}
              />
            </Box>
          </Grid>
        )}
        <Grid item xs={12} className={styles.gridItem}>
          <Box className={styles.boxContent}>
            <JsonResult serviceActions={serviceActions} />
          </Box>
        </Grid>
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
