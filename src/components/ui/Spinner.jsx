import styles from "./Spinner.module.css";

const Spinner = ({ size = 20, className = "" }) => (
  <span
    className={`${styles.spinner} ${className}`}
    style={{ width: size, height: size, borderWidth: Math.max(2, Math.round(size / 8)) }}
    aria-hidden="true"
  />
);

export default Spinner;
