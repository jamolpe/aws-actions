import ServiceSelector from "@/components/ActionsSelector";
import SelectedService from "@/components/SelectedService";
import { Service, ServiceStatement } from "@/model/models";
import { AccordionDetails, AccordionSummary, Accordion } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/ServiceAccordion.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";

type ServiceAccordionProps = {
  policyStatements: ServiceStatement[];
  defaultServices: Record<string, Service>;
  nameServices: {
    prefix: string;
    name: string;
  }[];
  accordionId: string;
  uuid: string;
  deletePolicyStatements: (uuid: string) => void;
  modifyServiceStatement: (
    uuid: string,
    servicesAction: ServiceStatement[]
  ) => void;
};

const ServiceAccordion = ({
  nameServices,
  defaultServices,
  policyStatements,
  accordionId,
  uuid,
  deletePolicyStatements,
  modifyServiceStatement,
}: ServiceAccordionProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const changeSelected = (serviceName: string | null) => {
    if (!serviceName) return setSelectedService(null);
    const service = nameServices.find((n) => n.name === serviceName);
    if (service) {
      setSelectedService(defaultServices[service.prefix]);
    }
  };

  const addServiceAction = (serviceAction: ServiceStatement) => {
    const index = policyStatements.findIndex(
      (p) => p.service === serviceAction.service
    );
    if (index >= 0) {
      const newPolicies = [...policyStatements];
      newPolicies[index] = serviceAction;
      modifyServiceStatement(uuid, newPolicies);
    } else {
      const newPolicies = [...policyStatements, serviceAction];
      modifyServiceStatement(uuid, newPolicies);
    }
  };

  const removeServiceAction = (service: string) => {
    const newPolicies = policyStatements.filter((pa) => pa.service !== service);
    modifyServiceStatement(uuid, newPolicies);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      key={uuid}
      expanded={expanded === uuid}
      onChange={handleChange(uuid)}
      className={`${styles.accordionNoShadow}`}
    >
      <AccordionSummary className={styles.summary}>
        <DeleteIcon
          fontSize="medium"
          className={styles.delete}
          onClick={(e) => {
            e.stopPropagation();
            deletePolicyStatements(uuid);
          }}
        />
        <div className={styles.content}>Statement {accordionId}</div>
        {expanded === uuid ? (
          <KeyboardArrowUpIcon fontSize="medium" className={styles.arrow} />
        ) : (
          <KeyboardArrowDownIcon fontSize="medium" className={styles.arrow} />
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
                policyStatements.find(
                  (ps) => ps.service === selectedService.prefix
                )?.action ?? []
              }
              defaultArn={
                policyStatements.find(
                  (ps) => ps.service === selectedService.prefix
                )?.arn ?? selectedService.arn_format
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
