import { Checkbox, Grid } from "@mui/material";
import React from "react";
import styles from "../styles/Home.module.scss";

type SelectedTypeProps = {
  typeActions: string[];
  searchQuery?: string;
  type: string;
};
const SelectedType = ({
  typeActions,
  searchQuery,
  type,
}: SelectedTypeProps) => {
  let filteredData = typeActions;
  if (searchQuery)
    filteredData = typeActions.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  const chunkSize = Math.ceil(filteredData.length / 3);
  const chunks = Array.from({ length: 3 }, (_, i) =>
    filteredData.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
  return (
    <>
      {chunkSize !== 0 && (
        <>
          <div className={styles.name}>
            <span>{type}</span>
          </div>
          <Grid container>
            {chunks.map((chunk, i) => (
              <Grid item xs={4} key={i} className={styles.column}>
                {chunk.map((item, j) => (
                  <div className={styles.action} key={j}>
                    <Checkbox size="small" style={{ padding: 0 }} />
                    {item}
                  </div>
                ))}
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default SelectedType;
