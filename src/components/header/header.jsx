import GoalsCounter from "./goalsCounter/GoalsCounter";
import styles from "./header.module.css";
import Timer from "./timer/Timer";

const Header = ({ goals, start, onStop }) => {
  return (
    <div className={styles.container}>
      <div className={styles.counterContainer}>
        <GoalsCounter goals={goals} />
      </div>
      <div className={styles.timerContainer}>
        <Timer start={start} onStop={onStop} />
      </div>
    </div>
  );
};

export default Header;
