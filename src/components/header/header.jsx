import GoalsCounter from "./goalsCounter/GoalsCounter";
import styles from "./header.module.css";
import Timer from "./timer/Timer";

const Header = ({ goals, start, onStop, shots, streak, onTick, bestStreak, goals2, opponentName }) => {
  return (
    <div className={styles.container}>
      <div className={styles.counterContainer}>
        {goals2 !== undefined ? (
          <div className={styles.matchScore}>
            <span className={styles.matchScoreLabel}>{opponentName || "Rival"}</span>
            <span className={styles.matchScoreValue}>{goals2}</span>
            <span className={styles.matchScoreVs}>—</span>
            <span className={styles.matchScoreValue}>{goals}</span>
          </div>
        ) : (
          <GoalsCounter goals={goals} />
        )}
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
        {goals2 === undefined && (
          <Timer start={start} onStop={onStop} goals={goals} onTick={onTick} />
        )}
      </div>
    </div>
  );
};

export default Header;
