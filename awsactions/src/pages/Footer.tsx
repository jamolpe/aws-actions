import React from "react";
import styles from "../styles/Footer.module.scss";
import GitHubIcon from "@mui/icons-material/GitHub";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <a className={styles.item} href="mailto: jamolpedev@gmail.com">
        @jamolpedev
      </a>
      <a className={styles.item} href="https://github.com/jamolpe">
        <GitHubIcon />
        <div className={styles.item}>jamolpe</div>
      </a>
    </div>
  );
};

export default Footer;
