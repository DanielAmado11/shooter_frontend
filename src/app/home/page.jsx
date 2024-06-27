"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        let progressBar = document.getElementById('progress-bar');
        let width = 0;
        let interval = setInterval(frame, 50);

        function frame() {
            if (width >= 100) {
                clearInterval(interval);
                router.push("/welcome");
                redirect("/welcome");
            } else {
                width++;
                progressBar.style.width = width + '%';
            }
        }
    }, []);

    return (
        <div className="content home">
            <div className="item logoMiami">
                <img src="/images/logo_miami_moCAAD.png" alt="Miami MoCAAD" />
            </div>
            <div className="item logoAR">
                <div className="">
                    <img src="/images/logo_ARshootout.png" alt="AR Shoot Out" />
                </div>
                <div className="progress-container">
                    <div className="progress-bar" id="progress-bar"/>
                </div>
            </div>
            <div className="item"/>
        </div>
    );
}

export default Home;
