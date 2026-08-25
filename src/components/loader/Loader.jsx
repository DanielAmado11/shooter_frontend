import { Html, useProgress } from "@react-three/drei";
import styles from "./Loader.module.css";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html>
      <div className={styles.container}>
        <div className="content home">
          <div className="item logoMiami"></div>
          <div className="item logoAR">
            <img src="/images/logo_ARshootout.png" alt="AR Shoot Out" />
            <div className="progress-container">
              <div
                className="progress-bar"
                id="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="readyText">GET READY TO SHOOT!</div>
          </div>
          <div className="item"></div>
        </div>
      </div>
    </Html>
  );
};

export default Loader;
