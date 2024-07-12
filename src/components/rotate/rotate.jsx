import styles from "./rotate.module.css";

const Rotate = (props) => {
  return (
    <div className={`${styles.container} ${!props.open && styles.close}`}>
      <div className="content screen">
        <div className="rotate_screen">
          <img
            className="rotating"
            src="/images/girar_pantalla.png"
            alt="Rotate Phone"
          />
        </div>
        <div className="textRotate">
          <p>Rotate your screen</p>
        </div>
      </div>
    </div>
  );
};

export default Rotate;
