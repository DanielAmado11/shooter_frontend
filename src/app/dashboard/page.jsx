"use client";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="content dashboard">
      <div className="item">
        <div className="selectItem">
          <img src="/images/playGame.png" alt="Play" />
        </div>
        <button
          className="btn"
          onClick={() => {
            router.push("/game");
            router.push("/game");
          }}
        >
          Play
        </button>
      </div>
      <div className="item">
        <div className="selectItem">
          <img src="/images/editCharacter.png" alt="Edit" />
        </div>
        <button
          className="btn"
          onClick={() => {
            router.push("/selection");
            router.push("/selection");
          }}
        >
          Edit
        </button>
      </div>
      <div className="item">
        <div className="selectItem">
          <img src="/images/dataRanking.png" alt="Leaderboard" />
        </div>
        <button
          className="btn"
          onClick={() => {
            router.push("/leaderboard");
            router.push("/leaderboard");
          }}
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
