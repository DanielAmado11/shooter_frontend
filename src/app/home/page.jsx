"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
    const router = useRouter();
    const intervalRef = useRef(null);

    useEffect(() => {
        let progressBar = document.getElementById('progress-bar');
        let width = 0;
        intervalRef.current = setInterval(frame, 50);

        function frame() {
            if (width >= 100) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                router.push("/welcome");
            } else {
                width++;
                progressBar.style.width = width + '%';
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    return (
        <div className="content home">
            <div className="item logoMiami"></div>
            <div className="item logoAR">
                <img src="/images/logo_ARshootout.png" alt="AR Shoot Out" />
                <div className="progress-container">
                    <div className="progress-bar" id="progress-bar"/>
                </div>
                <div className="readyText">GET READY TO SHOOT!</div>
            </div>
            <div className="item"/>
        </div>
    );
}

export default Home;
