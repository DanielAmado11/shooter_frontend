import { Html, useProgress } from "@react-three/drei";
import logo1 from "../../../public/images/logo_miami_moCAAD.png";
import logo2 from "../../../public/images/logo_ARshootout.png";
import Image from "next/image";
import styles from "./Loader.module.css";

const Loader = ({ onStart }) => {
  const { progress } = useProgress();

  if (progress === 100) {
    setTimeout(() => {
      onStart();
    }, 2000);
  }
  return (
    <Html center>
      <div className={styles.container}>
        <div className="content home">
          <div className="item logoMiami">
            <img src="/images/logo_miami_moCAAD.png" alt="Miami MoCAAD" />
          </div>
          <div className="item logoAR">
            <div className="">
              <img src="/images/logo_ARshootout.png" alt="AR Shoot Out" />
            </div>
            <div className="progress-container">
              <div
                className="progress-bar"
                id="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="item"></div>
        </div>
      </div>
    </Html>
  );
};

export default Loader;
