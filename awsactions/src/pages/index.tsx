import services from "./services.json";
import styles from "../styles/Home.module.scss";
import ServiceSelector from "@/components/ActionsSelector";
import { Box, Grid } from "@mui/material";
import SelectedService from "@/components/SelectedService";
import { PolicyAction, Service } from "@/model/models";
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
  const [policyActions, setPolicyActions] = useState<PolicyAction[]>([]);

  const changeSelected = (serviceName: string | null) => {
    if (!serviceName) return setSelectedService(null);
    const service = nameServices.find((n) => n.name === serviceName);
    if (service) {
      setSelectedService(services[service.prefix]);
    }
  };

  const addPolicyAction = (policyAction: PolicyAction) => {
    const index = policyActions.findIndex(
      (p) => p.Service === policyAction.Service
    );
    if (index >= 0) {
      const newPolicies = [...policyActions];
      newPolicies[index] = policyAction;
      setPolicyActions(newPolicies);
    } else {
      const newPolicies = [...policyActions, policyAction];
      setPolicyActions(newPolicies);
    }
  };

  const removePolicyAction = (policyService: string) => {
    const newPolicies = policyActions.filter(
      (pa) => pa.Service !== policyService
    );
    setPolicyActions(newPolicies);
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
                  policyActions.find(
                    (pa) => pa.Service === selectedService.prefix
                  )?.Action ?? []
                }
                service={selectedService}
                addPolicyAction={addPolicyAction}
                removePolicyAction={removePolicyAction}
              />
            </Box>
          </Grid>
        )}
        <Grid item xs={12} className={styles.gridItem}>
          <Box className={styles.boxContent}>
            <JsonResult policyActions={policyActions} />
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
