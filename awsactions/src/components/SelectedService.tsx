import { Service } from "@/model/models";
import React, { useState } from "react";
import styles from "../styles/Home.module.scss";
import SelectedType from "./SelectedType";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
type ServiceProps = {
  service: Service;
};
const SelectedService = ({ service }: ServiceProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className={styles.selectedService}>
      <h2>{service.name}</h2>
      <div>
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
        />
      </div>
      <div id="read" className={styles.typeSection}>
        <SelectedType
          type="Read"
          searchQuery={searchQuery}
          typeActions={service.readActions}
        />
      </div>
      <div id="write" className={styles.typeSection}>
        <SelectedType
          type="Write"
          searchQuery={searchQuery}
          typeActions={service.writeActions}
        />
      </div>
    </div>
  );
};

export default SelectedService;
