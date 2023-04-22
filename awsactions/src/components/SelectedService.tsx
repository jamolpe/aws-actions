import { ServiceAction, Service } from "@/model/models";
import React, { useState } from "react";
import styles from "../styles/Home.module.scss";
import stylesGeneral from "../styles/styles.module.scss";
import SelectedType from "./SelectedType";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SummarizeIcon from "@mui/icons-material/Summarize";

type ServiceProps = {
  actions: string[];
  service: Service;
  addServiceAction: (serviceAction: ServiceAction) => void;
  removeServiceAction: (serviceService: string) => void;
};
const SelectedService = ({
  service,
  actions,
  addServiceAction,
  removeServiceAction,
}: ServiceProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const addAction = (action: string) => {
    const newActions = [...actions, action];
    addServiceAction({
      Service: service.prefix,
      Action: newActions,
    });
  };

  const removeAction = (action: string) => {
    const newActions = actions.filter((a) => a !== action);
    addServiceAction({
      Service: service.prefix,
      Action: newActions,
    });
  };

  const removeFromService = () => {
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
      <div className={styles.buttonsSection}>
        <Button
          variant="contained"
          className={styles.deleteButton}
          style={{ background: stylesGeneral.redOrange }}
          onClick={() => removeFromService()}
        >
          <SummarizeIcon style={{ marginRight: "10px" }} /> Clear Service
        </Button>
      </div>
    </div>
  );
};

export default SelectedService;
