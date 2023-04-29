import { Grid } from "@mui/material";
import gridStyles from "../../styles/common/Grid.module.scss";
import React from "react";
import GridFullRowItem from "@/components/grid/GridFullRowItem";

const AnalycePolicy = () => {
  return (
    <Grid container spacing={2} className={gridStyles.mainGrid}>
      <GridFullRowItem>
        <h1> AWS Policy Analyce</h1>
      </GridFullRowItem>
    </Grid>
  );
};

export default AnalycePolicy;
