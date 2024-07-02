import { useEffect, useRef, useState } from "react";
import styles from "./ForceSelector.module.css";

const ForceSelector = ({ force }) => {
  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <div
          id="bar"
          className={styles.bar}
          style={{ width: `${force}%` }}
        ></div>
      </div>
      <div className={styles.iconContainer}>
        <img
          src="/images/icon-start-shoot.png"
          alt="icon"
          className={styles.icon}
        />
      </div>
    </div>
  );
};

export default ForceSelector;
