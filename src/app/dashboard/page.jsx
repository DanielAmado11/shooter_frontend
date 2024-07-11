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
    <div className={styles.page}>
      <button className="back" id="toggle-button" onClick={handleBack}>
        <img src="/images/back.png" alt="back" />
      </button>

      <div className={`${styles.container}`}>
        <div className={styles.item}>{data.name}</div>
        <div className={styles.item}>
          <span>User Id: </span> {data.code}
        </div>
        <div className={styles.item1}>
          <div className={`${styles.selection1}`}>
            <img src="/images/play_backgrund.jpg" alt="Play" />
            <button
              className={styles.button}
              onClick={() => {
                router.push("/game");
                redirect("/game");
              }}
            >
              Play
            </button>
          </div>
        </div>
        <div className={styles.item}>
          <div className={`${styles.selection}`}>
            <img src="/images/select.png" alt="Edit" />
            <button
              className={styles.button}
              onClick={() => {
                router.push("/selection");
                redirect("/selection");
              }}
            >
              Edit
            </button>
          </div>
        </div>
        <div className={`${styles.item} ${styles.leader}`}>
          <div className={`${styles.selection}`}>
            <img src="/images/cup.png" alt="Leaderboard" />
            <button
              className={styles.button}
              onClick={() => {
                router.push("/leaderboard");
                redirect("/leaderboard");
              }}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
