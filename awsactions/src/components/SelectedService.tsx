import { ServiceStatement, Service } from "@/model/models";
import React, { useEffect, useState } from "react";
import styles from "../styles/components/SelectedService.module.scss";
import SelectedType from "./SelectedType";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import broom from "../../public/icons/broom.svg";

type ServiceProps = {
  actions: string[];
  service: Service;
  defaultArn: string;
  addServiceAction: (serviceAction: ServiceStatement) => void;
  removeServiceAction: (serviceService: string) => void;
};
const SelectedService = ({
  service,
  actions,
  defaultArn,
  addServiceAction,
  removeServiceAction,
}: ServiceProps) => {
  const [arn, setArn] = useState<string>("*");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setArn(defaultArn);
  }, [actions, defaultArn]);

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleArn = (event: any) => {
    setArn(event.target.value);
    addServiceAction({
      service: service.prefix,
      action: actions,
      arn: event.target.value,
    });
  };

  const addAction = (action: string) => {
    const newActions = [...actions, action];
    addServiceAction({
      service: service.prefix,
      action: newActions,
      arn,
    });
  };

  const removeAction = (action: string) => {
    const newActions = actions.filter((a) => a !== action);
    addServiceAction({
      service: service.prefix,
      action: newActions,
      arn,
    });
  };

  const removeFromService = () => {
    setArn("*");
    removeServiceAction(service.prefix);
  };

  return (
    <div className={styles.selectedService}>
      <h2>{service.name}</h2>
      <div className={styles.search}>
        <TextField
          size="small"
          label="Search"
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
          margin="normal"
          variant="outlined"
          className={styles.search}
          sx={{ width: 300, background: "white" }}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </div>
      <div id="list" className={styles.typeSection}>
        <SelectedType
          selectedActions={actions}
          type="List"
          searchQuery={searchQuery}
          typeActions={service.listActions}
          prefix={service.prefix}
          addAction={addAction}
          removeAction={removeAction}
        />
      </div>
      <div id="read" className={styles.typeSection}>
        <SelectedType
          selectedActions={actions}
          type="Read"
          searchQuery={searchQuery}
          typeActions={service.readActions}
          prefix={service.prefix}
          addAction={addAction}
          removeAction={removeAction}
        />
      </div>
      <div id="write" className={styles.typeSection}>
        <SelectedType
          selectedActions={actions}
          type="Write"
          searchQuery={searchQuery}
          typeActions={service.writeActions}
          prefix={service.prefix}
          addAction={addAction}
          removeAction={removeAction}
        />
      </div>
      <div id="arn" className={styles.arn}>
        <TextField
          size="small"
          label="ARN"
          className={styles.arn}
          value={arn}
          sx={{ width: 300, background: "white" }}
          onChange={handleArn}
        />
      </div>
      <div className={styles.buttonsSection}>
        <Image
          onClick={() => removeFromService()}
          src={broom}
          className={styles.clearService}
          style={{ marginRight: "10px" }}
          alt={"clear statement"}
        />
      </div>
    </div>
  );
};

export default SelectedService;
