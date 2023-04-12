import { Service } from "@/model/models";
import React from "react";
import styles from "../styles/Home.module.scss";
import SelectedType from "./SelectedType";

type ServiceProps = {
  service: Service;
};
const SelectedService = ({ service }: ServiceProps) => {
  return (
    <div className={styles.selectedService}>
      <h2>{service.name}</h2>
      <div id="list" className={styles.typeSection}>
        <div className={styles.name}>
          <span>List</span>
        </div>
        <SelectedType typeActions={service.listActions} />
      </div>
      <div id="read" className={styles.typeSection}>
        <div className={styles.name}>
          <span>Read</span>
        </div>
        <SelectedType typeActions={service.readActions} />
      </div>
      <div id="write" className={styles.typeSection}>
        <div className={styles.name}>
          <span>Write</span>
        </div>
        <SelectedType typeActions={service.writeActions} />
      </div>
    </div>
  );
};

export default SelectedService;
