"use client";
import { redirect, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useAuth } from "@/components/providers/auth-provider";

const Dashboard = () => {
  const router = useRouter();
  const { data } = useAuth();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <button className="back" id="toggle-button" onClick={handleBack}>
        <img src="/images/back.png" alt="back" />
      </button>
      <div className="content headerDashboard">
        <p className="name">{data.name}</p>
        <p className="userID">User ID: {data.code}</p>
      </div>
      <div className="content dashboard">
        <div className="item">
          <div className="selectItem">
            <div className="contentImg">
              <img src="/images/gamePlay.png" alt="Play" />
            </div>
            <button
              className="btn"
              onClick={() => {
                router.push("/instructions");
              }}
            >
              Play
            </button>
          </div>
        </div>
        <div className="item">
          <div className="selectItem">
            <div className="contentImg">
              <img src="/images/edit_avatar.png" alt="Edit" />
            </div>
            <button
              className="btn"
              onClick={() => {
                router.push("/selection");
              }}
            >
              Edit
            </button>
          </div>
          <div className="selectItem">
            <div className="contentImg">
              <img src="/images/cup.png" alt="Leaderboard" />
            </div>
            <button
              className="btn"
              onClick={() => {
                router.push("/leaderboard");
              }}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
