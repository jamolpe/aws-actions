import { Service } from "@/model/models";
import React, { useState } from "react";
import styles from "../styles/Home.module.scss";
import stylesGeneral from "../styles/styles.module.scss";
import SelectedType from "./SelectedType";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SummarizeIcon from "@mui/icons-material/Summarize";

type ServiceProps = {
  service: Service;
};
const SelectedService = ({ service }: ServiceProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [actions, setActions] = useState<string[]>([]);

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const addAction = (action: string) => {
    const newActions = [...actions, action];
    setActions(newActions);
  };

  const removeAction = (action: string) => {
    const newActions = actions.filter((a) => a !== action);
    setActions(newActions);
  };

  const onAddToJsonClick = () => {
    console.log(actions);
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
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </div>
      <div id="list" className={styles.typeSection}>
        <SelectedType
          type="List"
          searchQuery={searchQuery}
          typeActions={service.listActions}
          addAction={addAction}
          removeAction={removeAction}
        />
      </div>
      <div id="read" className={styles.typeSection}>
        <SelectedType
          type="Read"
          searchQuery={searchQuery}
          typeActions={service.readActions}
          addAction={addAction}
          removeAction={removeAction}
        />
      </div>
      <div id="write" className={styles.typeSection}>
        <SelectedType
          type="Write"
          searchQuery={searchQuery}
          typeActions={service.writeActions}
          addAction={addAction}
          removeAction={removeAction}
        />
      </div>
      <Button
        variant="contained"
        className={styles.generateButton}
        style={{ background: stylesGeneral.redOrange }}
        onClick={() => onAddToJsonClick()}
      >
        <SummarizeIcon style={{ marginRight: "10px" }} /> Add to Json
      </Button>
    </div>
  );
};

export default SelectedService;
