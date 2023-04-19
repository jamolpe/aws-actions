import { Grid } from "@mui/material";
import React from "react";
import styles from "../../styles/common/Grid.module.scss";

type GridFullRowItemProps = {
  children: JSX.Element;
  extraStyle?: string;
};

const GridFullRowItem = ({ children, extraStyle }: GridFullRowItemProps) => {
  return (
    <Grid item xs={12} className={`${styles.gridItem} ${extraStyle}`}>
      <div className={styles.boxContent}>{children}</div>
    </Grid>
  );
};

export default GridFullRowItem;
