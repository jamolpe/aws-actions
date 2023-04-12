import { Grid } from "@mui/material";
import React from "react";
import styles from "../styles/Home.module.scss";

type SelectedTypeProps = {
  typeActions: string[];
};
const SelectedType = ({ typeActions }: SelectedTypeProps) => {
  const chunkSize = Math.ceil(typeActions.length / 3);
  const chunks = Array.from({ length: 3 }, (_, i) =>
    typeActions.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
  return (
    <>
      <Grid container>
        {chunks.map((chunk, i) => (
          <Grid item xs={4} key={i} className={styles.column}>
            {chunk.map((item, j) => (
              <div className={styles.action} key={j}>
                {item}
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SelectedType;
