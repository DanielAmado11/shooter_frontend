import { Html, useProgress } from "@react-three/drei";
import logo1 from "../../../public/images/logo_miami_moCAAD.png";
import logo2 from "../../../public/images/logo_ARshootout.png";
import Image from "next/image";
import styles from "./Loader.module.css";

const Loader = (props) => {

    console.log("Loader", props);

    return (
        <div className={styles.container2}>
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
                            style={{ width: `80%` }}
                        ></div>
                    </div>
                </div>
                <div className="item"></div>
            </div>
        </div>
    );
};

export default Loader;