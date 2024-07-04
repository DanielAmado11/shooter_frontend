import { useEffect, useState } from "react";
import styles from "./Timer.module.css";
import { useMutation } from "react-query";
import { createScore } from "@/services/score";

const Timer = ({ start, onStop, goals }) => {
  const [time, setTime] = useState(45);
  const { mutate: addScoreMutation, isLoading: isAddingScore } = useMutation(
    (data) => createScore(data)
  );

  useEffect(() => {
    if (start) {
      let counter = 45;
      const interval = setInterval(() => {
        if (counter <= 0) {
          counter = 0;
          onStop();
          addScoreMutation(
            { score: goals },
            {
              onSuccess: () => {
                console.log("Score added successfully");
              },
              onError: () => {
                console.log("Error adding score");
              },
            }
          );
        } else {
          counter--;
          setTime((prevTime) => prevTime - 1);
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
