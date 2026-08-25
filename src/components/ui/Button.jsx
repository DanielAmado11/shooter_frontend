import Spinner from "./Spinner";
import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
  ...rest
}) => {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      className={[
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...rest}
    >
      {loading && <Spinner size={18} className={styles.spinner} />}
      <span className={styles.label}>{children}</span>
    </button>
  );
};

export default Button;
