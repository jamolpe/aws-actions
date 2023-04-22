import ServiceSelector from "@/components/ActionsSelector";
import SelectedService from "@/components/SelectedService";
import { Service, ServiceAction } from "@/model/models";
import { AccordionDetails, AccordionSummary, Accordion } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/ServiceAccordion.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";

type ServiceAccordionProps = {
  services: Record<string, Service>;
  nameServices: {
    prefix: string;
    name: string;
  }[];
  accordionId: number;
  id: number;
  deleteAction: (id: number) => void;
};

const ServiceAccordion = ({
  nameServices,
  services,
  accordionId,
  id,
  deleteAction,
}: ServiceAccordionProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceActions, setServiceActions] = useState<ServiceAction[]>([]);
  const [expanded, setExpanded] = React.useState<number | false>(false);

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

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      key={id}
      expanded={expanded === id}
      onChange={handleChange(id)}
      className={`${styles.accordionNoShadow}`}
    >
      <AccordionSummary className={styles.summary}>
        <DeleteIcon
          fontSize="large"
          className={styles.delete}
          onClick={(e) => {
            e.stopPropagation();
            deleteAction(id);
          }}
        />
        <div className={styles.content}>Service {accordionId}</div>
        {expanded === id ? (
          <KeyboardArrowUpIcon fontSize="large" className={styles.arrow} />
        ) : (
          <KeyboardArrowDownIcon fontSize="large" className={styles.arrow} />
        )}
      </AccordionSummary>
      <AccordionDetails
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <>
          <ServiceSelector
            serviceNames={nameServices.map((a) => a.name)}
            selected={selectedService?.name ?? null}
            changeSelected={changeSelected}
          />
          {selectedService && (
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
          )}
        </>
      </AccordionDetails>
    </Accordion>
  );
};

export default ServiceAccordion;
