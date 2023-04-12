import services from "./services.json";
import styles from "../styles/Home.module.scss";
import ServiceSelector from "@/components/ActionsSelector";
import { Box, Grid } from "@mui/material";
import SelectedService from "@/components/SelectedAction";
import { Service } from "@/model/models";
import { useState } from "react";

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

  const changeSelected = (serviceName: string | null) => {
    if (!serviceName) return setSelectedService(null);
    const service = nameServices.find((n) => n.name === serviceName);
    if (service) {
      setSelectedService(services[service.prefix]);
    }
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
              <SelectedService service={selectedService} />
            </Box>
          </Grid>
        )}
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
