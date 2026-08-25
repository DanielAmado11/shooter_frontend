import styles from "./Input.module.css";

const Input = ({ label, id, className = "", fullWidth = false, ...rest }) => {
  const input = (
    <input
      id={id}
      className={[styles.input, fullWidth && styles.fullWidth, className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );

  if (label) {
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        {input}
      </div>
    );
  }

  return input;
};

export default Input;
