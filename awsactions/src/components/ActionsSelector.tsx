import { Autocomplete, TextField } from "@mui/material";
import React from "react";

type ActionsSelectorProps = {
  actionsTitles: string[];
};
const ActionsSelector = ({ actionsTitles }: ActionsSelectorProps) => {
  return (
    <>
      <Autocomplete
        size="small"
        disablePortal
        id="combo-box-demo"
        options={actionsTitles}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Action" />}
      />
    </>
  );
};

export default ActionsSelector;
