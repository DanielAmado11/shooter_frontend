import styles from "./PageShell.module.css";

const PageShell = ({ children, className = "", padded = true }) => {
  return (
    <div
      className={[
        styles.shell,
        padded && styles.padded,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
};

export default PageShell;
