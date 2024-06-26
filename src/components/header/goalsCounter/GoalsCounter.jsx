import styles from "./GoalsCounter.module.css";

const GoalsCounter = ({ goals }) => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>GOALS</div>
      <div className={styles.number}>{goals}</div>
    </div>
  );
};
export default GoalsCounter;
