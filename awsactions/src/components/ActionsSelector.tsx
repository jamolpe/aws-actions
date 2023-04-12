import { Autocomplete, TextField } from "@mui/material";
import React from "react";

type ServiceSelectorProps = {
  serviceNames: string[];
  selected: string | null;
  changeSelected: (title: string | null) => void;
};
const ServiceSelector = ({
  serviceNames,
  changeSelected,
  selected,
}: ServiceSelectorProps) => {
  return (
    <>
      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        options={serviceNames}
        value={selected}
        onChange={(e, value) => {
          changeSelected(value);
        }}
        sx={{ width: 300, background: "white" }}
        renderInput={(params) => <TextField {...params} label="Action" />}
      />
    </>
  );
};

export default ServiceSelector;
