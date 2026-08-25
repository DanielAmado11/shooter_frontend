import styles from "./Loader.module.css";

const Loader = (props) => {
    return (
        <div className={styles.container2}>
            <div className="content home">
                <div className="item logoMiami"></div>
                <div className="item logoAR">
                    <img src="/images/logo_ARshootout.png" alt="AR Shoot Out" />
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            id="progress-bar"
                            style={{ width: `80%` }}
                        ></div>
                    </div>
                    <div className="readyText">GET READY TO SHOOT!</div>
                </div>
                <div className="item"></div>
            </div>
        </div>
    );
};

export default Loader;
