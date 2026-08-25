import { useEffect, useState } from "react";
import styles from "./Timer.module.css";
import { useMutation } from "react-query";
import { createScore } from "@/services/score";
import { useCharacterAnimation } from "@/contexts/CharacterAnimation";
import { GAME_TIMING } from "@/utils/gameTiming";

let goalsCounter = 0;

const timer = process.env.TIMER || GAME_TIMING.duration;

const Timer = ({ start, onStop, goals, onTick }) => {
  const [time, setTime] = useState(timer);
  const { setAnimationIndex } = useCharacterAnimation();
  const { mutate: addScoreMutation, isLoading: isAddingScore } = useMutation(
    (data) => createScore(data)
  );

  const handleAddScore = () => {
    addScoreMutation(
      { score: goalsCounter },
      {
        onSuccess: () => {
          console.log("Score added successfully");
        },
        onError: () => {
          console.log("Error adding score");
        },
      }
    );
  };

  const handleStop = () => {
    onStop();
    setAnimationIndex(2);
    handleAddScore();
  };

  useEffect(() => {
    if (start) {
      let counter = timer;
      const interval = setInterval(() => {
        if (counter <= 0) {
          counter = 0;
          handleStop();
        } else {
          counter--;
          setTime((prevTime) => prevTime - 1);
          if (typeof onTick === "function") onTick(counter);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [start]);

  useEffect(() => {
    goalsCounter = goals;
  }, [goals]);

  return (
    <div
      className={`${styles.container} ${time <= 10 ? styles.low : ""}`}
    >
      <div className={styles.title}>TIME</div>
      <div className={styles.number}>{time}</div>
      <div className={styles.text}>SEC</div>
    </div>
  );
};

export default Timer;
