import styles from "./ForceSelector.module.css";

const ForceSelector = ({ force }) => {
  const level = Math.min(10, Math.max(1, Math.round(force / 10) || 1));
  const isSpecial = force >= 85 && force <= 95;
  return (
    <div className={styles.container}>
      <div className={styles.barWrapper}>
        <div className={styles.barContainer}>
          <div className={styles.specialZone}></div>
          <div
            id="bar"
            className={`${styles.bar} ${isSpecial ? styles.barSpecial : ""}`}
            style={{ width: `${force}%` }}
          ></div>
          <div className={styles.ticks}>
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={styles.tick}></span>
            ))}
          </div>
        </div>
        <span className={`${styles.power} ${isSpecial ? styles.powerSpecial : ""}`}>
          {isSpecial
            ? "SPECIAL 9/10 · apunta a la esquina!"
            : `POWER ${level}/10 · ${Math.round(force)}%`}
        </span>
      </div>
      <div className={styles.iconContainer}>
        <img
          src="/images/icon-start-shoot.png"
          alt="icon"
          className={styles.icon}
        />
        <span className={styles.iconLabel}>Shoot</span>
      </div>
    </div>
  );
};

export default ForceSelector;
