import { useEffect, useState } from "react";
import styles from "./Timer.module.css";

const Timer = ({ start, onStop }) => {
  const [time, setTime] = useState(0);

  const interval = setInterval(() => {});

  useEffect(() => {
    if (start) {
      let counter = 0;
      const interval = setInterval(() => {
        if (counter >= 60) {
          // clearInterval(interval);
          setTime(0);
          counter = 0;
          onStop();
        } else {
          counter++;
          setTime((prevTime) => prevTime + 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [start]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>TIME</div>
      <div className={styles.number}>{time}</div>
      <div className={styles.text}>SEC</div>
    </div>
  );
};

export default Timer;
