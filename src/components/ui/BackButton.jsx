import styles from "./BackButton.module.css";

const BackButton = ({ onClick, label = "Go back" }) => (
  <button
    className={styles.back}
    type="button"
    aria-label={label}
    onClick={onClick}
  >
    <svg
      className={styles.icon}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default BackButton;
