import GoalsCounter from "./goalsCounter/GoalsCounter";
import styles from "./header.module.css";
import Timer from "./timer/Timer";

const Header = ({ goals, start, onStop, shots, streak, onTick, bestStreak }) => {
  return (
    <div className={styles.container}>
      <div className={styles.counterContainer}>
        <GoalsCounter goals={goals} />
        <div className={styles.stats}>
          <span className={styles.stat}>
            SHOTS <b>{shots}</b>
          </span>
          <span
            className={`${styles.stat} ${streak >= 3 ? styles.statFire : ""}`}
          >
            STREAK <b>{streak}</b>
          </span>
          {bestStreak > 0 && (
            <span className={styles.stat}>
              BEST <b>{bestStreak}</b>
            </span>
          )}
        </div>
      </div>
      <div className={styles.timerContainer}>
        <Timer start={start} onStop={onStop} goals={goals} onTick={onTick} />
      </div>
    </div>
  );
};

export default Header;
